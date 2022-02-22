<template>
  <!--    地图 DOM 元素-->
  <div id="container" style="width: 450px; height: 250px"></div>
  <div>
    <input style="width: 200px; padding: 3px 4px" type="text" id="place" />
  </div>
</template>

<script>
export default {
  name: "Mymap",
  emits: ["changeLatAndLng"],
  props: {
    // ------------地图参数开始-----------------
    lat: {
      type: Number,
      default: 22,
    },
    lng: {
      type: Number,
      default: 33.3614501953125,
    },
    // ------------地图参数结束----------------
    data() {
      return {
        map: null,
        marker: null,
      };
    },
  },
  mounted() {
    this.loadmap();
  },
  methods: {
    loadmap() {
      console.log("每次加载");
      var center = new window.qq.maps.LatLng(this.lat, this.lng);
      var myOptions = {
        zoom: 8,
        center: center,
        mapTypeId: window.qq.maps.MapTypeId.ROADMAP,
      };
      //map就是我们看到的地图 实例化
      this.map = new window.qq.maps.Map(
        document.getElementById("container"),
        myOptions
      );
      // 创建默认标记 定位默认在center
      this.marker = new window.qq.maps.Marker({
        position: center,
        map: this.map,
      });
      // 获取点击默认标记的点击事件
      window.qq.maps.event.addListener(this.marker, "click", () => {
        //修改父组件的lat和lng
        this.changeLatAndLng(
          this.marker.getPosition().lat,
          this.marker.getPosition().lng
        );
        console.log(
          this.marker.getPosition().lat,
          this.marker.getPosition().lng
        );
      });
      //选择地图时点击事件
      window.qq.maps.event.addListener(this.map, "click", (event) => {
        //修改父组件的lat和lng
        this.changeLatAndLng(event.latLng.getLat(), event.latLng.getLng());
        console.log(event.latLng.getLat(), event.latLng.getLng());
        //修改标记的坐标
        this.marker.setPosition(
          new window.qq.maps.LatLng(
            event.latLng.getLat(),
            event.latLng.getLng()
          )
        );
      });
      //实例化自动完成
      var ap = new window.qq.maps.place.Autocomplete(
        document.getElementById("place"),
        {
          offset: new window.qq.maps.Size(0, 5),
          location: "北京市",
        }
      );
      var keyword = "";
      //调用Poi检索类。用于进行本地检索、周边检索等服务。
      var searchService = new window.qq.maps.SearchService({
        complete: (results) => {
          if (results.type === "CITY_LIST") {
            searchService.setLocation(results.detail.cities[0].cityName);
            searchService.search(keyword);
            return;
          }
          //搜索非城市时，可能出现多个搜索结果，创建多个标记
          var pois = results.detail.pois;
          var latlngBounds = new window.qq.maps.LatLngBounds();
          for (var i = 0, l = pois.length; i < l; i++) {
            if (i === 1) break;
            var poi = pois[i];
            latlngBounds.extend(poi.latLng);
            //修改标记的坐标
            this.marker.setPosition(poi.latLng);
            this.marker.setTitle(poi.name);
            //暂时限制只有一个显示哈
          }
          this.map.fitBounds(latlngBounds);
        },
      });
      //添加搜索监听事件
      window.qq.maps.event.addListener(ap, "confirm", function (res) {
        keyword = res.value;
        searchService.search(keyword);
      });
    },
    changeLatAndLng(lat, lng) {
      this.$emit("changeLatAndLng", lat, lng);
    },
  },
};
</script>

<style scoped></style>

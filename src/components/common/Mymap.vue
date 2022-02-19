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
  data() {
    return {
      // ------------地图参数开始-----------------
      lat: 39.53793974517628,
      lng: 117.3614501953125,
      // ------------地图参数结束----------------
    };
  },
  mounted() {
    //标记的数组
    var markersArray = [];
    // 地图的中心地理坐标
    var center = new window.qq.maps.LatLng(this.lat, this.lng);
    var myOptions = {
      zoom: 8,
      center: center,
      mapTypeId: window.qq.maps.MapTypeId.ROADMAP,
    };
    //map就是我们看到的地图 实例化
    var map = new window.qq.maps.Map(
      document.getElementById("container"),
      myOptions
    );
    // 创建默认标记 定位默认在center
    var marker = new window.qq.maps.Marker({
      position: center,
      map: map,
    });
    //存放在标记数组中
    markersArray.push(marker);
    // 获取点击默认标记的点击事件
    window.qq.maps.event.addListener(marker, "click", ()=> {
      this.lat=marker.getPosition().lat;
      this.lng=marker.getPosition().lng;
      console.log(this.lat,this.lng)
    });
    //选择地图时点击事件
    window.qq.maps.event.addListener(map, "click",  (event)=> {
      this.lat=event.latLng.getLat();
      this.lng=event.latLng.getLng();
      console.log(this.lat,this.lng)
      //清空所有标记
      if (markersArray) {
        var i = 0;
        for (i in markersArray) {
          markersArray[i].setMap(null);
        }
      }
      //新增标记点
     marker = new window.qq.maps.Marker({
        position: new window.qq.maps.LatLng(
          event.latLng.getLat(),
          event.latLng.getLng()
        ),
        map: map,
      });
      //存放在标记数组中
      markersArray.push(marker);
      // 获取点击了新增标记的点击事件
      window.qq.maps.event.addListener(marker, "click", ()=> {
        this.lat=marker.getPosition().lat;
        this.lng=marker.getPosition().lng;
        console.log(this.lat,this.lng)
      });
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
      complete:  (results)=> {
        if (results.type === "CITY_LIST") {
          searchService.setLocation(results.detail.cities[0].cityName);
          searchService.search(keyword);
          return;
        }
        //搜索非城市时，可能出现多个搜索结果，创建多个标记
        var pois = results.detail.pois;
        var latlngBounds = new window.qq.maps.LatLngBounds();
        for (var i = 0, l = pois.length; i < l; i++) {
          if (i ===1) break;
          var poi = pois[i];
          latlngBounds.extend(poi.latLng);
          var marker = new window.qq.maps.Marker({
            map: map,
            position: poi.latLng,
          });
          marker.setTitle(poi.name);
          markersArray.push(marker);
          //暂时限制只有一个显示哈
            }
        map.fitBounds(latlngBounds);
        //选中其中一个标记的情况
        window.qq.maps.event.addListener(marker, "click",  ()=> {
          this.lat=marker.getPosition().lat;
          this.lng=marker.getPosition().lng;
          console.log(this.lat,this.lng)
          //清空
          if (markersArray) {
            for (var i = 0;i<markersArray.length;i++) {
              markersArray[i].setMap(null);
            }
          }
          //增加
          //新增标记点
          marker = new window.qq.maps.Marker({
            position: marker.getPosition(),
            map: map,
          });
          //存放在标记数组中
          markersArray.push(marker);
          // 获取点击了新增标记的点击事件
          window.qq.maps.event.addListener(marker, "click", ()=> {
            this.lat=marker.getPosition().lat;
            this.lng=marker.getPosition().lng;
            console.log(this.lat,this.lng)
          });
        });
      },
    });
    //添加搜索监听事件
    window.qq.maps.event.addListener(ap, "confirm", function (res) {
      keyword = res.value;
      searchService.search(keyword);
    });
  },
};
</script>

<style scoped></style>

/** 
    Attributes:
      borderColor: String 中间横线的边框颜色
      data: Array 需要渲染的数据列表
      activeColor: String 目前的选中元素的颜色
      activeIndex: Number 目前的选中元素的下标
      blod: Boolean  目前的选中元素是否加粗
    Methods:
      handleCurrent   Function(param1, param2)
        @param1 Object , 目前的选中值
        @param2 Number , 目前的选中下标
 */

<template>
  <div class="my_picker">
    <div
      ref="scrollbox"
      class="my_picker__content"
      @scroll="boxScroll()"
      @touchstart="touchFlag = false;"
      @touchend="ScrollTouchEnd"
    >
      <ul class="my_picker__warp">
        <li
          class="my_picker__item"
          v-for="(item,index) in data"
          :key="index"
          :style="[idx === index? {color:activeColor} : '',{ 'font-weight': blod && idx === index ? 700 : 400} ]"
          @click="handleCurrent(index)"
        >{{ item.text }}</li>
      </ul>
    </div>
    <div class="line" :style="{borderColor: `${borderColor}`}"></div>
  </div>
</template>

<script>
export default {
  props: {
    borderColor: {
      type: String,
      default: "#e4e7ed"
    },
    data: {
      type: Array,
      default: () => []
    },
    activeColor: {
      type: String,
      default: "#000"
    },
    blod: {
      type: Boolean,
      default: true
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 手指离开屏幕状态
      touchFlag: true,
      // 滚动条停止状态
      stopScrollFlag: false,
      // 当前索引
      idx: 0,
      // 滚动出去的距离
      scrollTop: 0
    };
  },
  methods: {
    handleCurrent($index) {
      this.updateScrollTop($index);
    },
    // 监听滚动停止
    boxScroll() {
      let _this = this;
      if (this.stopScrollFlag) {
        this.stopScrollFlag = false;
      }
      clearTimeout(this.timeIds);
      this.timeIds = setTimeout(() => {
        _this.stopScrollFlag = true;
        let scrollboxscrollTop = _this.$refs.scrollbox.scrollTop;
        if (
          _this.touchFlag &&
          _this.stopScrollFlag &&
          scrollboxscrollTop !== _this.scrollTop
        ) {
          _this.updateScrollTop();
        }
      }, 50);
    },
    // 手指离开
    ScrollTouchEnd() {
      this.touchFlag = true;
      if (this.touchFlag && this.stopScrollFlag) {
        this.updateScrollTop();
      }
    },
    // 滚动方法
    updateScrollTop($index) {
      let scrollbox = this.$refs.scrollbox;
      let liHeight = scrollbox.querySelector("li").offsetHeight;
      this.idx = $index;
      if (typeof $index === "number") {
        scrollbox.scrollTop = $index * liHeight;
        this.scrollTop = $index * liHeight;
      } else {
        let scrollboxHeight = scrollbox.offsetHeight; // 盒子高度
        let scrollboxscrollTop = scrollbox.scrollTop; // 盒子滚动出去的高度
        // 获取到当前元素
        let scrollOutNum = Math.round(scrollboxscrollTop / liHeight);
        this.idx = scrollOutNum;
        scrollbox.scrollTop = scrollOutNum * liHeight;
        this.scrollTop = scrollOutNum * liHeight;
      }
      this.$emit("handleCurrent", this.data[this.idx], this.idx);

      // 兼容pc端
      this.touchFlag = true;
    }
  },
  watch: {
    activeIndex: {
      handler(val) {
        let _this = this;
        _this.idx = val;
        _this.$nextTick(() => {
          _this.updateScrollTop(val);
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.my_picker {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: auto;
  .line {
    position: absolute;
    width: 100%;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid;
    border-width: 1px 0;
    pointer-events: none;
  }
}
.my_picker__content {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: auto;
}
ul.my_picker__warp {
  margin: 0;
  padding: 0;
  &::before {
    content: "";
    display: block;
    height: 40px;
    width: 100%;
  }
  &::after {
    content: "";
    display: block;
    height: 40px;
    width: 100%;
  }
  li.my_picker__item {
    outline: 0 none;
    cursor: pointer;
    text-align: center;
    list-style-type: none;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    color: #c0c4cc;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
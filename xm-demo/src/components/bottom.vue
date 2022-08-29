<template>
  <div>
    <div class="bottom-box">
      <div class="ng-promise-box">
        <div class="ng-promise">
          <div class="text">
            <a href="javascript:;" class="icon1"
              ><i class="el-icon-success"></i> 7天无理由退换货</a
            >
            <a href="javascript:;" class="icon1"
              ><i class="el-icon-success"></i> 满99元全场免邮</a
            >
            <a href="javascript:;" class="icon1"
              ><i class="el-icon-success"></i> 100%品质保证</a
            >
          </div>
        </div>
        <div class="github" style="margin: 0">
          <a href="https://github.com/hai-27/vue-store"
            ><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAC4jAAAuIwF4pT92AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTA4VDE1OjIzOjAzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTA4VDE3OjMwOjM2KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0wOFQxNzozMDozNiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3OWRkZWEwOC0wODBhLWVkNDAtYmRhYi1iMDIxYjNmYTdiZmYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNDc1NTY4YS0xZGE3LTZjNGMtYjlmNi04YjY4Y2IyY2ZmZjEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNmQyNTdlMi1iYjcyLTVkNDItOGZmMy0xN2M5NjdiM2FlN2QiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2ZDI1N2UyLWJiNzItNWQ0Mi04ZmYzLTE3Yzk2N2IzYWU3ZCIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0wOFQxNToyMzowMyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNTEyMjRjMy05YjllLTVhNGEtOGQyMy1iMzU1MzJkM2Q2ZjUiIHN0RXZ0OndoZW49IjIwMjAtMDMtMDhUMTU6MjM6MDMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzlkZGVhMDgtMDgwYS1lZDQwLWJkYWItYjAyMWIzZmE3YmZmIiBzdEV2dDp3aGVuPSIyMDIwLTAzLTA4VDE3OjMwOjM2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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"
              alt=""
          /></a>
          <p>
            <span @click="$router.push('/')">首页</span> |
            <span @click="$router.push('/allGoods')">全部商品</span> |
            <span @click="$router.push('/aboutUs')">关于我们</span>
          </p>
          <p>商城版权所有 © 2012-2021</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.bottom-box {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
  color: #fff;
  p {
    color: #aaa;
    span {
      margin: 0 10px;
      cursor: pointer;
    }
    span:hover{
      color: #fff;
    }
  }
  .github {
    text-align: center;
  }
  .ng-promise-box {
    margin: 0 auto;
    border-bottom: 1px solid #3d3d3d;
    line-height: 80px;
    a {
      color: #fff;
      font-size: 25px;
      margin-right: 70px;
      padding-left: 44px;
      height: 40px;
      display: inline-block;
      line-height: 40px;
    }
  }
}
</style>
import XtxSkeleton from "@/components/library/XtxSkeleton";
import XtxCarousel from "@/components/library/XtxCarousel";
import XtxMore from "@/components/library/XtxMore";
import lazy from "@/components/directive/lazy";

const library = {
  install(app) {
    // 骨架屏
    app.component(XtxSkeleton.name, XtxSkeleton);
    // 轮播图
    app.component(XtxCarousel.name, XtxCarousel);
    // 查看更多
    app.component(XtxMore.name, XtxMore);
    // 图片懒加载
    app.directive("lazy", lazy);
  },
};

export default library;

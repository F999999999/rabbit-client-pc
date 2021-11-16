import XtxSkeleton from "@/components/library/XtxSkeleton";
import XtxCarousel from "@/components/library/XtxCarousel";
import XtxMore from "@/components/library/XtxMore";

const library = {
  install(app) {
    // 骨架屏
    app.component(XtxSkeleton.name, XtxSkeleton);
    // 轮播图
    app.component(XtxCarousel.name, XtxCarousel);
    // 查看更多
    app.component(XtxMore.name, XtxMore);
  },
};

export default library;

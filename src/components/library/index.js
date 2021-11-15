import XtxSkeleton from "@/components/library/XtxSkeleton";
import XtxCarousel from "@/components/library/XtxCarousel";

const library = {
  install(app) {
    // 骨架屏
    app.component(XtxSkeleton, name, XtxSkeleton);
    // 轮播图
    app.component(XtxCarousel.name, XtxCarousel);
  },
};

export default library;

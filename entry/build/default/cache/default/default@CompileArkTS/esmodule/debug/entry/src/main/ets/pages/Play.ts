if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Play_Params {
    swiperController?: SwiperController;
    songRouterIndex?: number;
    songInfo?: songPlayInfo;
}
import router from "@ohos:router";
import window from "@ohos:window";
import { songList } from "@normalized:N&&&entry/src/main/ets/model/musicInfo&";
import type { songInfo, songPlayInfo } from "@normalized:N&&&entry/src/main/ets/model/musicInfo&";
import { AVPlayerClass } from "@normalized:N&&&entry/src/main/ets/utils/AVPlayerClass&";
import emitter from "@ohos:events.emitter";
interface routerObj {
    // 参数名必须要和跳转前页面传入的参数名保持一致
    // 否则会提示没有定义该参数
    selectedIndex: number;
}
class Play extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.swiperController = new SwiperController();
        this.songRouterIndex = 0;
        this.__songInfo = new ObservedPropertyObjectPU({
            songDuration: 0,
            songTime: 0,
            isPlay: false,
            playIndex: 0
        }, this, "songInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Play_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.songRouterIndex !== undefined) {
            this.songRouterIndex = params.songRouterIndex;
        }
        if (params.songInfo !== undefined) {
            this.songInfo = params.songInfo;
        }
    }
    updateStateVars(params: Play_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__songInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__songInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    aboutToAppear() {
        // AVPlayerClass.publishMessage()
        // 接收播放信息
        emitter.on({
            eventId: 0
        }, (songData) => {
            this.songInfo = songData.data as songPlayInfo;
            console.log('songTest', JSON.stringify(this.songInfo));
        });
        console.log('songTest', JSON.stringify(this.songInfo));
        // 接收选择播放的音乐信息,此处主要是下标
        let songRouterInfo = router.getParams() as routerObj;
        let songSelectedIndex = songRouterInfo.selectedIndex;
        // 用于进入播放页时，指定swiper展示页面的下标
        this.songRouterIndex = songSelectedIndex;
        // 判断是否第一次播放音乐
        if (AVPlayerClass.player.state == 'idle') {
            AVPlayerClass.playIndex = songSelectedIndex;
            AVPlayerClass.player.url = songList[songRouterInfo.selectedIndex].songUrl;
        }
        else {
            // 判断是否是同一首歌
            console.log('songIndex', songSelectedIndex, AVPlayerClass.playIndex);
            if (songSelectedIndex != AVPlayerClass.playIndex) { // 切歌
                console.log('change1' + 'yes');
                // 更新当前播放器的下标
                AVPlayerClass.playIndex = songSelectedIndex;
                AVPlayerClass.changePlay(songList[songSelectedIndex]);
            }
            else { // 不切歌
                console.log('change1' + 'no');
                if (AVPlayerClass.player.state == 'paused') {
                    AVPlayerClass.publishMessage();
                }
            }
        }
        // 进入播放页时手动更新一下
        // 当暂停播放后重新进入，由于处于暂停状态，不会推送消息
        // 此时歌曲信息就是此页面设置的默认值
        // 因此需要手动推送一下歌曲信息
    }
    // 解决预览器上方空白问题
    onPageShow(): void {
        window.getLastWindow(AppStorage.get("context"), (err, data) => {
            if (err.code) {
                console.error('Failed to get last window. Cause:' + JSON.stringify(err));
                return;
            }
            data.setFullScreen(true);
        });
    }
    private swiperController: SwiperController;
    private songRouterIndex: number;
    // 默认初始化
    private __songInfo: ObservedPropertyObjectPU<songPlayInfo>;
    get songInfo() {
        return this.__songInfo.get();
    }
    set songInfo(newValue: songPlayInfo) {
        this.__songInfo.set(newValue);
    }
    number2time(timeNumber: number): string {
        let timeSecond = Math.floor(timeNumber / 1000);
        if (timeSecond < 60) {
            return `00:${timeSecond.toString().padStart(2, '0')}`;
        }
        else {
            let timeMinute = Math.floor(timeSecond / 60);
            timeSecond = timeSecond % 60;
            console.log('time2', timeMinute.toString().padStart(2, '0'));
            return `${timeMinute.toString().padStart(2, '0')}:${timeSecond.toString().padStart(2, '0')}`;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.width("100%");
            Column.height("100%");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.swiperController);
            Swiper.index(this.songRouterIndex);
            Swiper.width("100%");
            Swiper.aspectRatio(1);
            Swiper.indicator(false);
            Swiper.duration(1000);
            Swiper.onChange((index: number) => {
                AVPlayerClass.playIndex = index;
                AVPlayerClass.changePlay(songList[index]);
                AVPlayerClass.isPlay = true;
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding(50);
                    Column.backgroundImage(item.songImage);
                    Column.backgroundImageSize(ImageSize.Cover);
                    Column.backgroundBlurStyle(BlurStyle.BACKGROUND_ULTRA_THICK);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.songImage);
                    Image.borderRadius(200);
                }, Image);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, songList, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // TODO 滚动条
            Slider.create({
                style: SliderStyle.OutSet,
                min: 0,
                max: this.songInfo.songDuration,
                value: this.songInfo.songTime
            });
            // TODO 滚动条
            Slider.blockColor(Color.Red);
            // TODO 滚动条
            Slider.width(300);
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width("100%");
            Row.padding({ left: 30, right: 30 });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.number2time(this.songInfo.songTime));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.number2time(this.songInfo.songDuration));
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // TODO 上一首
            Button.createWithLabel("上一首");
            // TODO 上一首
            Button.width(200);
            // TODO 上一首
            Button.height(60);
            // TODO 上一首
            Button.onClick(() => {
                this.swiperController.showPrevious();
            });
        }, Button);
        // TODO 上一首
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // TODO 动态渲染播放/暂停按钮
            if (this.songInfo.isPlay) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // TODO 现在为播放状态，显示为暂停按钮
                        Button.createWithLabel("暂停");
                        Context.animation({ duration: 1500 });
                        // TODO 现在为播放状态，显示为暂停按钮
                        Button.width(200);
                        // TODO 现在为播放状态，显示为暂停按钮
                        Button.height(60);
                        // TODO 现在为播放状态，显示为暂停按钮
                        Button.backgroundColor(Color.Red);
                        // TODO 现在为播放状态，显示为暂停按钮
                        Button.onClick(() => {
                            AVPlayerClass.player.pause();
                        });
                        Context.animation(null);
                    }, Button);
                    // TODO 现在为播放状态，显示为暂停按钮
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // TODO 现在为暂停状态，显示为播放按钮
                        Button.createWithLabel("播放");
                        Context.animation({ duration: 1500 });
                        // TODO 现在为暂停状态，显示为播放按钮
                        Button.width(200);
                        // TODO 现在为暂停状态，显示为播放按钮
                        Button.height(60);
                        // TODO 现在为暂停状态，显示为播放按钮
                        Button.backgroundColor(Color.Orange);
                        // TODO 现在为暂停状态，显示为播放按钮
                        Button.onClick(() => {
                            AVPlayerClass.player.play();
                        });
                        Context.animation(null);
                    }, Button);
                    // TODO 现在为暂停状态，显示为播放按钮
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // TODO 下一首
            Button.createWithLabel("下一首");
            // TODO 下一首
            Button.width(200);
            // TODO 下一首
            Button.height(60);
            // TODO 下一首
            Button.onClick(() => {
                this.swiperController.showNext();
            });
        }, Button);
        // TODO 下一首
        Button.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Play";
    }
}
registerNamedRoute(() => new Play(undefined, {}), "", { bundleName: "com.example.musicplayerdemo", moduleName: "entry", pagePath: "pages/Play", pageFullPath: "entry/src/main/ets/pages/Play", integratedHsp: "false" });

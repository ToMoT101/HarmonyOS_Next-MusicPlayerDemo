if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
}
import { songList } from "@normalized:N&&&entry/src/main/ets/model/musicInfo&";
import type { songInfo } from "@normalized:N&&&entry/src/main/ets/model/musicInfo&";
import router from "@ohos:router";
import window from "@ohos:window";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#111113');
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(24);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('猜你喜欢');
            Text.fontColor('#fff');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('随机播放');
            Text.fontColor('#fff');
            Text.onClick(() => {
                let randIndex: number = Math.floor(Math.random() * songList.length);
                router.pushUrl({
                    url: 'pages/Play',
                    params: {
                        selectedIndex: randIndex
                    }
                });
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 10 });
            List.width('100%');
            List.height('100%');
            List.padding({
                left: 24,
                right: 24
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const song = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.onClick(() => {
                            router.pushUrl({
                                url: 'pages/Play',
                                params: {
                                    selectedIndex: index
                                }
                            });
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(song.songImage);
                            Image.width(60);
                            Image.borderRadius(8);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create({ space: 10 });
                            Column.padding({
                                left: 16
                            });
                            Column.layoutWeight(1);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(song.songName);
                            Text.fontColor('#fff');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 5 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(song.songAuthor);
                            Text.fontColor('#fff');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('更多');
                            Text.fontSize(15);
                            Text.fontColor(Color.White);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, songList, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('没有更多啦~');
                    Text.padding(8);
                    Text.width('100%');
                    Text.fontColor('#ccc');
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.musicplayerdemo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });

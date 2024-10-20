import media from "@ohos:multimedia.media";
import emitter from "@ohos:events.emitter";
import type { songInfo } from '../model/musicInfo';
class AVPlayerClass {
    static player: media.AVPlayer = {} as media.AVPlayer;
    static isPlay: boolean = false;
    static songTime: number = 0; // 当前播放时长
    static songDuration: number = 0; // 总时长
    static playIndex: number = 0;
    static async player_init() {
        AVPlayerClass.player = await media.createAVPlayer();
        // TODO 状态监听
        AVPlayerClass.player.on('stateChange', (state) => {
            switch (state) {
                case 'initialized':
                    AVPlayerClass.player.prepare();
                    break;
                case 'prepared':
                    AVPlayerClass.player.play();
                    break;
                case 'paused':
                    AVPlayerClass.isPlay = false;
                    // 由于是根据播放时长监听
                    // 只有在播放时才会推送,一旦停止播放就不会推送
                    // 因此需要在停止时推送一次，主要是推送播放状态
                    AVPlayerClass.publishMessage();
                    break;
                case 'playing':
                    AVPlayerClass.isPlay = true;
                    break;
            }
        });
        // TODO 总时长监听
        AVPlayerClass.player.on('durationUpdate', (duration) => {
            AVPlayerClass.songDuration = duration;
        });
        // TODO 播放时长监听
        AVPlayerClass.player.on('timeUpdate', (time) => {
            AVPlayerClass.songTime = time;
            AVPlayerClass.publishMessage();
        });
    }
    static async changePlay(song: songInfo) {
        // AVPlayerClass.playList.unshift(song)
        // AVPlayerClass.playIndex = 0
        await AVPlayerClass.player.reset();
        AVPlayerClass.player.url = song.songUrl;
    }
    static publishMessage() {
        emitter.emit({
            eventId: 0
        }, {
            data: {
                songDuration: AVPlayerClass.songDuration,
                songTime: AVPlayerClass.songTime,
                isPlay: AVPlayerClass.isPlay,
                playIndex: AVPlayerClass.playIndex
            }
        });
    }
}
export { AVPlayerClass };

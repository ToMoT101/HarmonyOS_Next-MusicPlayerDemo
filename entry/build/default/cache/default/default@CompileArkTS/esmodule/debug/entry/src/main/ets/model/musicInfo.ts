interface songInfo {
    songName: string;
    songAuthor: string;
    songImage: string;
    songUrl: string;
}
const songList: songInfo[] = [
    {
        songName: "Rolling in the Deep",
        songAuthor: 'Adele',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/14.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/14.m4a'
    },
    {
        songName: '画',
        songAuthor: '赵磊',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/1.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/1.mp3',
    },
    {
        songName: 'Sweet Dreams',
        songAuthor: 'TPaul Sax / Eurythmics',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/2.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/2.mp3',
    },
    {
        songName: '空心',
        songAuthor: '光泽',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/4.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/4.mp3',
    },
    {
        songName: '反转地球',
        songAuthor: '潘玮柏',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/5.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/5.mp3',
    },
    {
        songName: 'No.9',
        songAuthor: 'T-ara',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/6.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/6.m4a',
    },
    {
        songName: '孤独',
        songAuthor: 'G.E.M.邓紫棋',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/7.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/7.m4a',
    },
    {
        songName: 'Lose Control',
        songAuthor: 'Hedley',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/8.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/8.m4a',
    },
    {
        songName: '北京北京',
        songAuthor: '汪峰',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/10.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/10.m4a',
    },
    {
        songName: '苦笑',
        songAuthor: '汪苏泷',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/11.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/11.mp3',
    },
    {
        songName: '一生所爱',
        songAuthor: '卢冠廷 / 莫文蔚',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/12.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/12.m4a',
    },
    {
        songName: '海阔天空',
        songAuthor: 'Beyond',
        songImage: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/15.jpg',
        songUrl: 'http://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/HeimaCloudMusic/15.m4a',
    }
];
interface songPlayInfo {
    songDuration: number;
    songTime: number;
    isPlay: boolean;
    playIndex: number;
}
export { songList };
export type { songInfo, songPlayInfo };

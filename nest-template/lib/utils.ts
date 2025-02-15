import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../src/generated/i18n.types';
import { BadRequestException } from '@nestjs/common';

export const videoMimeTypes = [
	'application/vnd.apple.mpegurl',
	'application/x-mpegurl',
	'video/3gpp',
	'video/mp2t',
	'video/mp4',
	'video/mpeg',
	'video/ms-asf',
	'video/ogg',
	'video/quicktime',
	'video/webm',
	'video/x-flv',
	'video/x-m4v',
	'video/x-ms-wmv',
	'video/x-msvideo',
	'video/3gpp2',
	'video/3gpp-tt',
	'video/BMPEG',
	'video/BT656',
	'video/CelB',
	'video/DV',
	'video/H261',
	'video/H263',
	'video/H263-1998',
	'video/H263-2000',
	'video/H264',
	'video/JPEG',
	'video/MJ2',
	'video/MP1S',
	'video/MP2P',
	'video/MP2T',
	'video/mp4',
	'video/MP4V-ES',
	'video/mpeg',
	'video/mpeg4-generic',
	'video/MPV',
	'video/nv',
	'video/parityfec',
	'video/pointer',
	'video/quicktime',
	'video/raw',
	'video/rtp-enc-aescm128',
	'video/rtx',
	'video/SMPTE292M',
	'video/vc1',
	'video/vnd.dlna.mpeg-tts',
	'video/vnd.fvt',
	'video/vnd.hns.video',
	'video/vnd.motorola.video',
	'video/vnd.motorola.videop',
	'video/vnd.mpegurl',
	'video/vnd.nokia.interleaved-multimedia',
	'video/vnd.nokia.videovoip',
	'video/vnd.objectvideo',
	'video/vnd.sealedmedia.softseal.mov',
	'video/vnd.sealed.mpeg1',
	'video/vnd.sealed.mpeg4',
	'video/vnd.sealed.swf',
	'video/vnd.vivo',
];

export class Utils {
	static isVideo(mimetype: string) {
		return mimetype.startsWith('video/') || videoMimeTypes.includes(mimetype);
	}

	static stringOrArrayToArray(filter: string | string[]) {
		if (!filter) return [];
		const _ = Array.isArray(filter) ? (filter as string[])?.map((f) => f) : [filter];

		return _;
	}
}

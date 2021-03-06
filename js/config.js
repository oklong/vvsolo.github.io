﻿
/****** 常用 - 正则设定 ******/
var strCommon = {
	// 英文间隔符
	'enSep': '\u0027`＇‘’『』',
	// 中文
	// CJK is short for Chinese, Japanese, and Korean.
	'han': '\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff',
	// 所有拉丁字母，除去英文
	// \u00A0-\u00FF\u0100-\u017F\u0180-\u024F
	//'latin': '\\u00A0-\\u00FF\\u0100-\\u017F\\u0180-\\u024F',
	'latin': '\u00aa\u00ba\u00c0-\u0183\u0186-\u01a6\u01a9-\u01b9\u01ba\u01bf\u01c4-\u01c6\u01c9-\u020b\u0210-\u0240\u0243-\u0293\u0299-\u029f\u02a0\u02a3-\u02ac\u02ae-\u02af\u02b1-\u02b8\u02e0-\u02e3\u036a\u0391-\u03c9\u0401-\u0451\u1d00-\u1dbf\u1e00-\u1eff\u207f\u2090-\u2099\u209c\u211e\u2c60-\u2c7f\ua726-\ua729\ua730-\ua767\ua771-\ua7b7\ua7fb-\ua7ff\uab30-\uab5f\ufb00-\ufb04',
	// 半角标点，无引号
	'hwPun': '\u0021-\u0026\u0028-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u00A1-\u00BF',
	// 半角标点，引号 \u0022\u0027 双单
	'qhwPun': "\u0027",
	// 全角标点，无引号
	'fwPun': '·・–—…、。〈〉《》【】〔〕〖〗〝〞（），．：；？！～￠￡￢￣￤￥＆＠＃※',
	// 全角标点，引号
	'qfwPun': '‘’“”「」『』',
	// 其他标点 @
	'ofwPun': '℃％‰℉'
}

/****** 标题 - 正则设定 ******/
var strChapter = {
	'space': Space,
	'sep': ' 　，、．·。：—\\.\\,\\:\\-\\|',
	'c': ['卷部', '集篇阙季册闕冊', '章折回话节幕節話'],
	'cf': '[折卷章]',
	'crt': '章',
	's0': '[上中下续终續終]',
	's1': '[0-9０-９零一二三四五六七八九十]',
	'n1': '[0-9０-９]{1,4}',
	'n2': '[0-9０-９]{1,4}(?:[-—.][0-9０-９]{1,3})?',
	'n3': '[0０○〇零一二三四五六七八九十百千壹贰叁肆伍陆柒捌玖拾佰仟两廿卅卌貳叄陸兩]{1,7}',
	'n4': '最?[初前后终尾後終]|[上中下续断續斷]',
	// 短标题
	'w0': '(?:[简簡]介|介[绍紹]|[预預]告|自介)',
	'w1': '[0-9]{1,2}',
	'w3': '[一二三四五六七八九十]{1,3}',
	// 限制后面的字符最大数
	'en': '{0,40}',
	// 数字间的空格
	'nn': '[0-9０-９\\s]{1,8}'
}

// 标题正则
var regChapter = {
	// 标题无用的外框
	'b': ['〖【\\[', '\\]】〗'],
	// 标题行首空格 regStart
	'f': '[{$space}]*',
	// 标题间隔符（严格限定）regSeparator
	's': '[{$sep}]{1,4}',
	// 标题间隔符 regSeparatorNull
	'sn': '[{$sep}]{0,4}',
	// 行尾 regEnd
	'e': '.{$en}[^。：;；\\n]',
	// 行尾（严格限定） regStrictEnd ’”』」
	'es': '.{$en}[^，。：;；、…？！’”』」?!\\n]',
	/****** 非常规标题·无后续主体 ******/
	't0': '[首小节自次節]序|[题題][注记註記跋]|[题題开開][卷篇头场頭場][诗词语詩詞語]|文案|卷[首后後][语語]|(?:作者)?前言|[全本下][{$c.0}{$c.1}]{$w0}|(?:作品|作者|人物|内容|本书)?{$w0}|篇[后後]|(?:完本|作者)感言|作者[后後的][话話]|正文|导读|導讀|[附目][录錄][0-9]{0,2}',
	/****** 非常规标题·可有后续主体 ******/
	't1': [
		'楔子|引[言子文]|序篇?章|序[言幕目曲传傳卷]?|[后後][记话記話序]|尾[声记聲記]',
		'同人[续續]?|[前后外续正後續间間][传篇傳章]|[前后外里裏]番|[续續]{$s1}{1,3}[{$c.2}]?|[番篇]外[篇卷章]?（?{$s1}{0,3}）?',
		'外{$s1}{0,3}[{$c.2}]'
	],
	/****** 01章/第02章/第02-18章/03章：标题/第０９章：标题 ******/
	/****** 一章/第一章/一章：标题/第一章：标题 ******/
	/****** 终卷/终章 ******/
	't2': '((?:第?{$n2}|第?{$n3}|{$n4})[{$c}])',
	/****** （01）/（02）标题/（一）/（一）标题 ******/
	't3': '([\\(（](?:{$n2}|{$n3}|{$s0})[\\)）])',
	
	/****** 卷一/卷一：标题 ******/
	't4': '({$cf})[{$sep}]{0,4}({$n1}|{$n3})',
	/****** chapter 22 ******/
	't5': '(?:chapter|section|chap|ch|part|☆|★|○|●|◎|◇|◆|□|■|△|▲|※|＃)[ \\.]*({$n1})',
	/****** 01/01./01.标题/一/一、标题 ******/
	't6': '({$n2}|{$n3})',
	/****** 其他标题 ******/
	// 修正括号类标题（一） --> 第一章
	't80': '[\\[\\(（〖【〈［]({$n2}|{$n3})[\\]\\)）〗】〉］]',
	// 修正括号类标题（第一章） --> 第一章
	't81': '[\\[\\(（〖【〈［]((?:第?{$n2}|第?{$n3}|{$n4})[{$c}])[\\]\\)）〗】〉］]',
	// 松散标题
	't90': '(?:第?{$n2}|第?{$n3}|{$n4})',
	// 严格标题
	't91': '(?:第{$n2}|第{$n3}|{$n4})',
	// 修复标题间多余空格
	'ts': '[第\\(（]{$nn}[{$c}\\）)]'
}

// 处理自由组合的标题
Object.extend(String.prototype, {
	chapReg: function(f, r) {
		checkNull(f) && (f = 'gm')
		return this.fmt(regChapter, r).fmtReg(strChapter, f)
	},
	comReg: function(f) {
		checkNull(f) && (f = 'gm')
		return this.fmtReg(strCommon, f)
	}
})

var configs = {
	/***** 常规部分 *****/
	// 分隔符样式
	'Separator': '＊＊＊　　＊＊＊　　＊＊＊',
	// 章节与标题分隔符
	'Divide': '：',
	// 排版时每行最大字数（按双字节计算）
	'Linenum': 35,
	// 段落最大字数换行
	'maxLinenum': 200,
	// 结尾的标识语，用于排版输出时居中，用|分隔
	'endStrs': '待[续續]|未完|未完待[续續]|完|完[结結]|全[文书書][完终終]',
	/****** 文章标题 - 正则设定 ******/
	'novelTitle': /^[ 　]*(《([^》]+)》(.*[^。？！…]|$)|[书書]名[：\:](.+))$/m,
	'novelAuthor': /^[ 　]*((?:[作编译編譯]者|排版|整理)[：\:].*)$/gm,
	/****** 标题忽略 - 正则设定 ******/
	// 全角数字标题
	'regFullNumberTitle': '[第\\(（][０-９]{1,9}[{$c}\\)）]'.chapReg(),
	'regSkipTitle': {
		//'t0': /[。…—！？][」”]$/,
		't0': /[。;；—]$/,
		't1': /^(?:序[长词战兴常稿歌秩次传述長詞戰興傳]|[上下]回|[\-—]{1,4}|断章取义|同人不)/,
		't2': /^第?[零一二三四五六七八九十百两]{1,3}(?:部[分]|季[度]|卷[书经]|篇[篇经文]|[部集](?:戏|戲|电[影视視]|的)|部好莱坞|回合|节课)|^一(?:幕[幕]|回[生首头家頭閤]|[直切生世])|^二(?:话[没不沒])|^三(?:[生世])|^四[周边处]/,
		't3': '^[一二三四五六七八九十百两兩][{$c}].*[，].*$|^(?:{$n1}|{$n2})[年月日]'.chapReg(''),
		't6': [
			// 忽略日期格式 2010.10.10, 17.10.10, 17/10/10
			/^[\d０-９]{2,4}[\.\-\/。\—][\d０-９]{1,2}[\.\-\/。\—][\d０-９]{1,2}/,
			// 忽略日期格式 2010年10月10日, 五时十二分
			/^[\d０-９一二三四五六七八九十]{1,4}[年月日点时分秒點時](?:[\d０-９一二三四五六七八九十]|$)/,
			// 忽略日期格式 2010年10月10日, 五时十二分
			/^[\d０-９一二三四五六七八九十]{1,4}[年月][\d０-９一二三四五六七八九十]{1,2}[月日]/,
			// 忽略时间格式 20:22:21
			/^[\d０-９]{1,2}(?:[\:：][\d０-９]{1,2}){1,2}/,
			// 其他不规则格式 100%, 60°
			/^[\d０-９]{1,6}[\%％‰℃°]$/,
			// 比分类格式 3:0
			/^[\d０-９]{1,2}[\:：][\d０-９]{1,2}/,
			// 10元！20。
			/^[\d０-９一二三四五六七八九十百千万]{1,12}(?:元|块|次|多)?[！？。…]{1,3}$/,
			// 2.3亿
			/^[\d０-９\.\-\—\至]{1,12}[百千万亿wmbk]/i,
			// 排比数字 一、二、三……
			/^(?:[、，：][0-9二三四五六七八九十]{1,6})+[！？。…]{1,3}$/,
			// 排比数字 1、2、3……
			/^[0-9]{1,3}[、，：][0-9]{1,3}/
		]
	},
	/****** 英文处理 - 正则设定 ******/
	'findEng': {
		// 约定英语，用|分隔
		'Word': 'iPhone|iPhoneSE|iPhoneX|iPhoneXR|iPhoneXRMax|iPhoneXR|iPad|iPadPro|iPadAir|iMac|iTv|iPod|ing|BiuBiu|TikTok',
		// 约定英语大写，用|分隔
		'WordUpper': 'OMG|MTV|SUV|TV|ID|CIA|FBI|VIP|CEO|CFO|CTO|COO|CIO|CBD|OA|PC|OEM|SOS|SOHO|PS|ISO|APEC|WTO|USA|GPS|GSM|NASDAQ|MBA|ATM|GDP|AIDS|CD|VCD|DVD|CDMA|DIY|EMS|EQ|IQ|PDA|DJ|SARS|DNA|RNA|UFO|AV|WTF|TMD|IC|SM|TM|OK|NTR|QQ|DP|KTV|OL|PK|NDE|XXOO|OOXX|PM|CAA|CNN|CBS|BBS|ICM|IMAX|AMC|DC|NG|ABC|VS|SPA|VR|AR|ICU|IPO|IMDB|SWAT|IPTV|GPA|UI|LOL|IP|PVP|PVE|BBC|CCTV|TVB|NHK|PPT|NBC|NBA|ESPN|SEGA|YQF|MMP|IBM|CPU|HDMI|GPU',
		// 虚词一直小写
		'WordOnlyLower': 'a|an|the|in|on|of|to|from|with|by|for|at|be|will|should|about|under|and|but|is|as',
		// 小写的后缀
		'LowerExt': /。\b(?:Avi|Jpg|Bmp|Png|Net)\b/g,
		// 约定英语修正
		'WordFix': [],
		// 符合的英文
		'PunFix': "[0-9A-Z][ \\w{$latin}']+[0-9a-z]".comReg('g'),
		// 特殊的连续单词 转大写
		'Continuous': /\b(?:([a-z])\1+|abcdefg|abcdef|abcde|abcd|abc|xyz)\b/gi,
		// 拉丁字母、某些标点后的大写
		'PunAfter': '[，\, {$latin}][A-Z]'.comReg(),
		// 引用中的英文
		'Quote': '[“‘「『][ \\w{$hwPun}{$qhwPun}{$fwPun}{$latin}]{2,}[』」’”]'.comReg('g'),
		'QuoteTest': /[，。！？…]/,
		// 英文间单引号样式替换
		'Sep': ' *\\b[a-z]+\\b[{$enSep}](?: |\\b[a-z]+\\b)'.comReg('gi'),
		// 括号中的英文
		'Bracket': '[（〈《【〔〖][ \\w{$hwPun}{$qhwPun}{$fwPun}{$latin}]{2,}[〗〕】》〉）]'.comReg('g'),
		// 称谓单词前缀
		'HonorWord': /\b(?:Mrs?|Ms|Doc|Dr|Jr|Rev|Hon|Mmes?|Esq|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Nov|Dec)\b。(?!$)/g,
		// url
		//'Site': /\b(?:(?:https?|ftp|file)[:：]\/\/)?\b[-a-z0-9+&@#\/%?=~_|!:：,.。；;]+[-a-z0-9+&@#\/%=~_|]/gi,
		'Site': /(?:\b(?:https?|ftp|file)\b[:：]\/\/|\b)(?:[-\w]+[。\.])+\b(?:com|net|org|gov|top|xyz|cn)\b/gi,
		'SiteFix': ['：。，～—', ':.,~-'],
		// 英文单独一行
		'Line': '^[ \\w{$hwPun}{$qhwPun}{$fwPun}{$qfwPun}{$latin}]{2,}$'.comReg('gm'),
		'LineSkip': '[\\w{$latin}]'.comReg('g')
	},
	/****** 空格 - 正则设定 ******/
	// 汉字间空格
	'hanSpace': ' +[{$han}{$fwPun}{$qfwPun}{$ofwPun}]|[{$han}{$fwPun}{$qfwPun}{$ofwPun}] +'.comReg('g'),
	// 英文间空格
	//'engSpace': '[^0-9a-zA-Z] +\\b[0-9a-zA-Z]+\\b'.comReg('g'),
	// 英文间隔
	'enSep': '\\b([a-z]+)\\b[{$enSep}]( |\\b[a-z]+\\b)'.comReg('gi'),
	/****** 半角标点符号 ******/
	'halfPuns': ['。，：；？！＆–—─－', '.,:;?!&----'],
	'halfPunsOther': ['“”「」‘’『』（）', '\u0022\u0022\u0022\u0022\u0027\u0027\u0027\u0027()'],
	'halfSymbol': [
		[/\u0022/g, ' \u0022 '],
		[/\,(?=[a-z0-9])/gi, ', '],
		[/[?:;!]/g, '$& '],
		[/\(/g, ' ('],
		[/\)/g, ') '],
		[/&/g, ' & '],
		// fix
		[/\" *([^"]*[…,.!?~]) *\" */g, ' "$1" '],
		[/\" *([^"]*) *\"/g, '"$1"'],
		[/ +\" +/g, '" '],
		[/(\d) ?\" ?(?=\d)/g, '$1"'],
		[/ +(?=[?….!])/g, ''],
		[/([\.\?\!]) *(?=[》】'"”」’』])/g, '$1'],
		[/([A-Z]) *& *(?=[A-Z])/g, '$1&'],
		[/\. *(?=[》】'"])/g, '.'],
		[/\.(?=[a-z])/gi, '. '],
		[/(\w)……/g, '$1...'],
		[/  +/g, ' ']
	],
	/****** 引用符号 ******/
	// 法式引号 fr：'‘’“”'
	// 中式引号 cn：'『』「」'
	'cnQuotes': ['‘’“”', '『』「」'],
	// 引号修正
	'rQuotes': [
		// 修正单引号
		[/[`＇‘’『』]/g, '\''],
		[/'([^\'\n]+)'/g, '‘$1’'],
		[/^([ 　]*)'/g, '$1‘'],
		[/'/g, '’'],
		[/’([^‘’]+)’/g, '’$1‘'],
		[/^([ 　]*)’/g, '$1‘'],
		//[/‘$/g, '’'],
		[/：’/g, '：‘'],
		// 修正双引号
		// \[\]
		[/[〝〞［］＂″｢｣“”「」]/g, '\"'],
		[/"([^\"\n]+)"/g, '“$1”'],
		[/^([ 　]*)"/g, '$1“'],
		[/"/g, '”'],
		[/”([^“”]+)”/g, '”$1“'],
		[/^([ 　]*)”/g, '$1“'],
		//[/“$/g, '”'],
		[/：”/g, '：“']
	],
	/****** 分隔符 ******/
	// !@!@!@!@! 注释符
	// @@@@ 分隔符
	'rSeparator': [
		[/ +(?=[#§●◎◇◆□■△▲※〓＝﹡＋＊☆★@\*×\—\-\+－─=~～])/g, ''],
		// 注释标记※
		[/＊＊{34,}/g, '\n!@!@!@!@!\n'],
		[/[☆★`&]{5,}/g, '@@@@'],
		// 处理一般情况
		[/[#§●◎◇◆□■△▲※〓＝﹡＋]{3,}/g, '@@@@'],
		[/([。！？…—”」’』])[*＊×xX]{4,}/g, '$1\n@@@@\n'],
		[/^[\*＊×]{3,}/gm, '@@@@'],
		[/\*\*{3,}$/gm, '@@@@'],
		[/^\*\*{2,}$/gm, '@@@@'],
		[/[\—\-－─=\+]{4,}/g, '@@@@'],
		[/^[\—\-－─=~～\+]{2,}$/gm, '@@@@'],
		// 处理特殊情况
		[/^……\n……$/gm, '@@@@'],
		[/^。。+\n。。+$/gm, '@@@@'],
		[/[——]{2,}[分切]割线[——]{2,}/g, '@@@@'],
		[/^.*[分切]割线$/gm, '@@@@'],
		// 修正车牌号
		[/([a-z])[\-—]@@@+/gi, '$1-XXXXX'],
		// 修正数字和某些标点后的*号
		[/([\w：，；])\n?@@@@\n?/gm, '$1****'],
		[/@@@@\n?([，。！？…’”』」])/gm, '****$1'],
		// 处理换行
		[/@@\n+@@/g, '@@@@'],
		[/@@@+/g, '\n@@@@\n'],
		[/\n\n@@@@\n\n/g, '\n@@@@\n'],
		// 还原注释标记
		[/!@!@!@!@!/g, '＊'.times(35)]
	],
	/****** 其他替换设定 ******/
	// 全半角数字字母
	'sNumberLetter': [
		'０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	],
	// 全半角数字
	'sNumber': ['０１２３４５６７８９', '0123456789'],
	// 变体字母
	'sVariants': [
		'ÀÁÂÃÄÅĀАǍⱭàáâãäåāǎɑаßЬЪьъÇçÐÈÉÊËĒĚèéêëēěΗんÌÍÎÏĪǏΙìíîïīǐιМмΝÑŃŇИñńňиηÒÓÔÕÖŌǑØОòóôõöōðǒøоÞΡþρΤτÙÚÛÜŪǓǕǗǙǛυùúûüūǔǖǘǚǜⅤⅴνЩщωΥÝŸγýÿ',
		'AAAAAAAAAaaaaaaaaaaaBbbbbCcDEEEEEEeeeeeeHhIIIIIIIiiiiiiiMmmNNNNNnnnnnOOOOOOOOOooooooooooPPppTtUUUUUUUUUUuuuuuuuuuuuVvvWwwYYYyyy'
	],
	// 变体序号
	'sSerialNumber': [
		'⓪⓿⒈①➀⓵➊❶⑴⒉②⓶➁➋❷⑵⒊③⓷➂➌❸⑶⒋④⓸➃➍❹⑷⒌⑤⓹➄➎❺⑸⒍⓺⑥➅➏❻⑹⒎⓻⑦➆➐❼⑺⒏⓼⑧➇➑❽⑻⒐⑨➈⓽➒❾⑼⒑⑩➉⓾➓❿⑽⒒⑪⑾⒓⑫⑿⒔⑬⒀⒕⑭⒁⒖⑮⒂⒗⑯⒃⒘⑰⒄⒙⑱⒅⒚⑲⒆⒛⑳⒇㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩',
		'00|00|01|01|01|01|01|01|01|02|02|02|02|02|02|02|03|03|03|03|03|03|03|04|04|04|04|04|04|04|05|05|05|05|05|05|05|06|06|06|06|06|06|06|07|07|07|07|07|07|07|08|08|08|08|08|08|08|09|09|09|09|09|09|09|10|10|10|10|10|10|10|11|11|11|12|12|12|13|13|13|14|14|14|15|15|15|16|16|16|17|17|17|18|18|18|19|19|19|20|20|20|一|二|三|四|五|六|七|八|九|十|一|二|三|四|五|六|七|八|九|十'
	],
	// HTML 字符实体
	'regHtmlEntity': /[&＆]? ?([a-zA-Z1-8]{2,18})[;；]/g,
	'sHtmlEntity': {
		// 带有实体名称的 ASCII 实体
		'quot': '"', 'apos': "'", 'amp': '&', 'lt': '<', 'gt': '>',
		// ISO 8859-1 符号实体
		'nbsp': ' ', 'shy': '', 'copy': '©', 'reg': '®', 'trade': '™',
		'yen': '¥', 'cent': '¢', 'pound': '£', 'times': '×', 'divide': '÷',
		// 特殊转义字符
		'iexcl': '¡', 'curren': '¤', 'brvbar': '¦', 'sect': '§', 'uml': '¨',
		'ordf': 'ª', 'laquo': '«', 'not': '¬', 'macr': '¯', 'deg': '°',
		'plusmn': '±', 'sup1': '¹', 'sup2': '²', 'sup3': '³', 'acute': '´',
		'micro': 'µ', 'para': '¶', 'middot': '·', 'cedil': '¸', 'ordm': 'º',
		'raquo': '»', 'frac14': '¼', 'frac12': '½', 'frac34': '¾', 'iquest': '¿',
		// ISO 8859-1 字符实体
		'agrave': 'à', 'aacute': 'á', 'acirc': 'â', 'atilde': 'ã', 'auml': 'ä', 'aring': 'å', 'aelig': 'æ',
		'Agrave': 'À', 'Aacute': 'Á', 'Acirc': 'Â', 'Atilde': 'Ã', 'Auml': 'Ä', 'Aring': 'Å', 'AElig': 'Æ',
		'THORN': 'Þ', 'thorn': 'þ', 'szlig': 'ß',
		'ccedil': 'ç','Ccedil': 'Ç', 
		'ETH': 'Ð',
		'egrave': 'è', 'eacute': 'é', 'ecirc': 'ê', 'euml': 'ë',
		'Egrave': 'È', 'Eacute': 'É', 'Ecirc': 'Ê', 'Euml': 'Ë',
		'igrave': 'ì', 'iacute': 'í', 'icirc': 'î', 'iuml': 'ï',
		'Igrave': 'Ì', 'Iacute': 'Í', 'Icirc': 'Î', 'Iuml': 'Ï',
		'ntilde': 'ñ', 'Ntilde': 'Ñ',
		'eth': 'ð', 'ograve': 'ò', 'oacute': 'ó', 'ocirc': 'ô', 'otilde': 'õ', 'ouml': 'ö', 'oslash': 'ø',
		'Ograve': 'Ò', 'Oacute': 'Ó', 'Ocirc': 'Ô', 'Otilde': 'Õ', 'Ouml': 'Ö', 'Oslash': 'Ø',
		'ugrave': 'ù', 'uacute': 'ú', 'ucirc': 'û', 'uuml': 'ü',
		'Ugrave': 'Ù', 'Uacute': 'Ú', 'Ucirc': 'Û', 'Uuml': 'Ü',
		'yacute': 'ý', 'yuml': 'ÿ', 'Yacute': 'Ý'
	},
	/****** 标点符号 ******/
	// 异体标点
	// 角分′
	// 角秒″
	// 连接符–
	// 圆点．
	// 省略号⋯ \u2026
	// 间隔号•、●、
	'punSymbol': [
		// 按键盘顺序 ﹏﹋﹌ˇ
		'-｀‐━―─－ーˉ﹣﹦~﹗!﹫＠﹟＃﹩＄﹪％﹠＆﹡(﹙﹚)﹐,.．∶﹕︰:﹔;﹑﹖?⋯┅¨▪•‧・﹒︳﹛{﹜}〝｢″〃｣‴﹤﹥︿﹀﹢＋／︱¦＂′＇',
		'—`———————－＝～！！@@##$$%%&&＊（（）），，。。：：：：；；、？？………·····〉｛｛｝｝““””””＜＞∧∨++/\u007c\u007c\u0022\u0027\u0027'
	],
	// 标点符号修正
	'punSymbolFix': [
		//[/\-/g, '—'],
		// 中文破折号 ──
		//[/([\u4e00-\u9fa0])——+/g, '$1──'],
		//[/——+([\u4e00-\u9fa0])/g, '──$1'],
		// 连接号 — —— ～
		//[/\﹝/g, '［'], // 左方括号
		//[/\﹞/g, '］'], // 右方括号
		// 两个标点以上留一 「」『』“”‘’
		// ：；（）［］｛｝%∧∨〈〉
		[/——+/g, '——'],
		[/：：+/g, '：'],
		//[/，，+/g, '，'],
		[/；；+/g, '；'],
		[/（（+/g, '（'],
		[/））+/g, '）'],
		[/［［+/g, '［'],
		[/］］+/g, '］'],
		[/｛｛+/g, '｛'],
		[/｝｝+/g, '｝'],
		[/%%+/g, '%'],
		[/∧∧+/g, '∧'],
		[/∨∨+/g, '∨'],
		[/〈〈+/g, '〈'],
		[/〉〉+/g, '〉'],
		// 波折号处理
		[/～～+/g, '～～'],
		[/。～～\n/g, '。\n～～'],
		[/？～～\n/g, '？\n～～'],
		[/！～～\n/g, '！\n～～'],
		[/”～～\n/g, '”\n～～'],
		[/…～～\n/g, '…\n～～'],
		//[/」～～$/gm, '」\n～～'],
		// 省略号处理
		//[/[·、，`°]{2,}/g, '…'],
		[/··+/g, '…'],
		[/、、+/g, '…'],
		[/``+/g, '…'],
		[/°°+/g, '…'],
		[/。。+/g, '…'],
		[/，，，+/g, '…'],
		[/，，+/g, '，'],
		[/…[，：；。`\—·]/g, '…'],
		[/[，：；。`\—·]…/g, '…'],
		[/…+/g, '……'],
		// 去错误和相联标点
		[/“：/g, '：“'],
		[/：“”/g, '：“'],
		//[/「：/g, '：「'],
		//[/：「」/g, '：「'],
		//[/([…。，！？])”，/g, '$1”'],
		[/…”[，。！？]/g, '…”'],
		[/。”[，。！？]/g, '。”'],
		[/，”[，。！？]/g, '，”'],
		[/！”[，。！？]/g, '！”'],
		[/？”[，。！？]/g, '？”'],
		//[/([…。，！？])」，/g, '$1」'],
		//[/…」[，。！？]/g, '…」'],
		//[/。」[，。！？]/g, '。」'],
		//[/，」[，。！？]/g, '，」'],
		//[/！」[，。！？]/g, '！」'],
		//[/？」[，。！？]/g, '？」'],
		[/：[·`]/g, '：'],
		[/。）。/g, '）。'],
		//[/([：、，])[；：、？！]/g, '$1'],
		[/、[；：？！。]/g, '、'],
		[/：[；：、？！。]/g, '：'],
		[/，[；：、？！。]/g, '，'],
		// 修正问号和感叹号
		[/？！[？！]+/g, '？！'],
		[/！？[？！]+/g, '？！'],
		[/！！？+/g, '？！'],
		[/？？！+/g, '？！'],
		[/！！！+/g, '！！！'],
		[/？？？+/g, '？？？']
	],
	/****** 修正数字和英文字母 ******/
	'nwSymbol': [
		// 20,000.00
		//[/(?:\d+[，\.。]?)+(?=人民币|软妹币|元|韩元|美元|日元|英镑|港币|新?台币|法郎|比索|人|千|万|亿)/g, '$&'.replace(/，/g, ',')],
		// 英文连接符–
		[/([\-—～]+)(?:\b\w)/g, function(m, m1) {
			return m1.length > 1 ? m.replace(m1, '——') : m.replace(m1, '-')
		}],
		[/(?:\w\b)([\-—～]+)/g, function(m, m1) {
			return m1.length > 1 ? m.replace(m1, '——') : m.replace(m1, '-')
		}],
		// 处理 Sid·Meier -> Sid Meier
		[/([a-z]{2,})·(?=[a-z]{2,})/gi, '$1 '],
		// 处理 Up / Down -> Up/Down
		[/ *\/ *(?=[a-z]+)/gi, '/'],
		// 处理 E。T。 -> E.T.
		[/\b([a-z])\b[．。]/gi, '$1.'],
		[/\b([a-z])\b\.$/gmi, '$1。']
	],
	/****** 结尾修正 ******/
	'rEndFixed': {
		// 经纬度 20"65'
		'Latitude': '[0-9]{1,3}(?:[.。][0-9]{1,2})? ?[\u0022\u0027{$qfwPun}] ?[0-9]{1,3}(?:[.。][0-9]{1,2})? ?[\u0022\u0027{$qfwPun}]'.comReg('g'),
		'LatitudeAt': ['“‘”’「『」』 ', '\u0022\u0027'.times(4)],
		// 修正数字间的全角
		'Number': /\b\d+ *[。·.：〉〈＝＊，] *\d+(?: *[。·.：〉〈＝＊，] *\d+)?/g,
		'NumberAt': ['。·.：〉〈＝＊，', '...:><=*,'],
		// 时间 00:00:05，150
		'Time': /\b\d{1,2}[:：]\d{1,2}[:：]\d{1,2}(?:，\b\d{1,4}\b| ?AM\b| ?PM\b)?/gi,
		'TimeAt': ['：， ', ':,'],
		// 日期 2018年9月6日4:11
		'Date': /\b(?:31|30|2[0-9]|1[0-9]|0?[1-9])\b日 ?\b(?:2[0-3]|1[0-9]|0?[0-9])\b[:：]\b(?:5[0-9]|[1-4][0-9]|0?[1-9])/g,
		'DateAt': ['： ', ':']
	},
	'rEnd': [
		//[/ ((?:2[0-3]|1\d|0?[1-9])[:：](?:5[0-9]|[1-4]\d|0?\d)(?:AM|PM))(?=[^。，\n])/gi, ' $1\n'],
		// 修正箭头
		[/ *—{1,2}> */g, ' --> '],
		[/ *={1,2}> */g, ' => '],
		// 处理 No。1 -> NO.1
		[/\bno[。\.](?=\d{1,2})/gi, 'NO.'],
		// 公司简称
		[/ ?Co。，? ?Ltd。?/gi, ' Co.,Ltd.']
	]
}

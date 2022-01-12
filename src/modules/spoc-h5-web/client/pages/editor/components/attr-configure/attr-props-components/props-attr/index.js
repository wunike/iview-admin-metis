import Text from './text'
import imageSrc from './imageSrc'
import imageSrcList from './imageSrcList'
import Url from './url'
import Href from './href'
import musicSrc from './musicSrc'
import placeholder from './placeholder'
import rows from './rows'
import target from './target'
import videoSrc from './videoSrc'
import action from './action'
import rule from './rule'
import formStyle from './formStyle'
import labelStyle from './labelStyle'
import submitStyle from './submitStyle'
import chartData from './chartData'
export default {
	[Text.name]: Text,
	[imageSrc.name]: imageSrc,
	[Url.name]: Url,
	[Href.name]: Href,
	[musicSrc.name]: musicSrc,
	[imageSrcList.name]: imageSrcList,
	[placeholder.name]: placeholder,
	[rows.name]: rows,
	[videoSrc.name]: videoSrc,
	[action.name]: action,
	[rule.name]: rule,
    [target.name]:target,
    [formStyle.name]:formStyle,
    [labelStyle.name]:labelStyle,
    [submitStyle.name]:submitStyle,
    [chartData.name]:chartData,
}

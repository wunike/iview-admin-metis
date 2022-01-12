/**
 * 组件库入口
 * */

// 基础组件
import Text from './text'
import Images from './image'
import ImageCarousel from './image-carousel'
import RectangleBorder from './rectangle-border'
import Iframe from './iframe'
// import Button from './button'
import Links from './link'

// 表单组件
// import Input from './input'
import Textarea from './textarea'
import QkFormCreate from './formCreate'

// 功能组件
import bgMusic from './bg-music'
import Video from './video'

import formCreate, {
    maker
} from '@form-create/element-ui'
// 业务组件
//图表组件
import veLine from './veLine'
import veHistogram from './veHistogram'
import veBar from './veBar'
import vePie from './vePie'
import veRing from './veRing'
import veWaterfall from './veWaterfall'
import veFunnel from './veFunnel'
import veRadar from './veRadar'
import veHeatmap from './veHeatmap'
import veScatter from './veScatter'

import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';


// 所有组件列表
const components = [
    // 基础组件
    Text,
    Images,
    ImageCarousel,
    RectangleBorder,
    Iframe,
    // Button,
    Links,
    // 表单组件
    // Input,
    Textarea,
    formCreate,
    QkFormCreate,
    // 功能组件
    bgMusic,
    Video,
    // 业务组件
    //图表组件
    veLine,
    veHistogram,
    veBar,
    vePie,
    veRing,
    veWaterfall,
    veFunnel,
    veRadar,
    veHeatmap,
    veScatter,
    //elementUI
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification
]
// 定义 install 方法，接收 Vue 作为参数
const install = function(Vue) {
    // 判断是否安装，安装过就不继续往下执行
    if (install.installed) return
    install.installed = true
    // 遍历注册所有组件
    components.map(component => Vue.component(component.name, component))
}

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

let _qk_register_components_object = {};
components.forEach(item => {
    _qk_register_components_object[item.name] = item
})


export {
    veLine,
    veHistogram,
    veBar,
    vePie,
    veRing,
    veWaterfall,
    veFunnel,
    veRadar,
    veHeatmap,
    veScatter,
    Text,
    Images,
    ImageCarousel,
    RectangleBorder,
    Iframe,
    // Button,
    Links,
    formCreate,
    QkFormCreate,
    bgMusic,
    Video,
    // Input,
    // Textarea,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification,
    _qk_register_components_object
}



export default {
    install,
    // 所有组件，必须具有 install，才能使用 Vue.use()
}

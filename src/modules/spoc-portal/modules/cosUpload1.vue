<style lang="less">
.cosUpload {
	.uploadLabel{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		display: inline-block;
		width: 100px;
		text-align: right;
		margin-right: 12px;
	}
	.uploadProgress{
		display:inline-block;
		width:200px;
	}
	.uploadDel{
		color:#000;
		cursor:pointer;
	}
	.uploadWarning{
		padding-top: 8px;
		color: #999;
	}
	.openList{
		color: #44bcb7;
		cursor: pointer;
		margin-left:12px;
	}
}
</style>
<template>
	<div class="cosUpload">
		<Button v-show="showButton" type="primary" size="small" @click="openUploadFile" style="margin-right:12px;">{{uploadButtonName}}</Button><span v-show="maxNum > 1 && showButton">{{fileList.length + '/' + maxNum}}</span>
		<!-- <Button v-show="maxNum > 1" size="small" type="primary" @click="startUpload" style="margin-left:12px;margin-right:12px;">开始上传</Button> -->
		<!-- <Button v-show="maxNum > 1" size="small" @click="stopUpload">停止上传</Button> -->
		<div class="uploadWarning">
			<span>请上传不超过{{maxSize}}M的文件{{accept.length ? ',支持文件格式:' + accept.join(',') : ''}} </span>
			<span v-show="fileList.length > 1" class="openList" @click="openList = !openList">
				{{openList ? '收起': '展开'}}
			</span>
		</div>
		<Button type="primary" size="small" v-show="false" @click="getFileResultList">获取当前结果</Button>
		<div v-show="openList" style="margin-top:12px;">
			<div v-for="(item, index) in fileList" :key="index" style="overflow:hidden;">
				<span style="float:left;" class="uploadLabel" :title="item.fileName">{{item.fileName}}</span>
				<Progress style="float:left;" class="uploadProgress" :percent="uploadProgress[item.fileNameDate] || 0" :status="uploadProgress[item.fileNameDate] && uploadProgress[item.fileNameDate] == -1? 'wrong' : ''">
					<i v-if="uploadProgress[item.fileNameDate] && uploadProgress[item.fileNameDate] == -2" class="iconfont icon-zanting1 uploadDel"></i>
					<span style="color:red;" v-if="uploadProgress[item.fileNameDate] && uploadProgress[item.fileNameDate] == -1">失败</span>
				</Progress>
				<!-- <i style="float:left;" v-show="!isChangeFile" class="iconfont icon-shanchu uploadDel" @click="deleteFile(index)"></i> -->
			</div>
		</div>
		<input v-if="multiple && maxNum > 1" type="file" name="file" :id="fileInputId" multiple style="display:none;" />
		<input v-else type="file" name="file" :id="fileInputId" style="display:none;" />
	</div>
</template>
<script>
import valid, { errors, sys, sysUser, sysDict, sysAttachment, common } from "../libs/request";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
let uploader;
let stsToken;
let _this;

function init() {
	uploader = new VODUpload({
		// 文件上传失败
		onUploadFailed: function(uploadInfo, code, message) {
			_this.$set(_this.uploadProgress, uploadInfo.object, -1)
			console.log("onUploadFailed", uploadInfo);
			_this.getFileResultList(2)
		},
		// 文件上传完成
		onUploadSucceed: function(uploadInfo) {
			console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
			let fileNameArray = uploadInfo.object.split('/')
			let fileName = fileNameArray[fileNameArray.length - 1]
			let fileTypeArray = fileName.split('.')
			let fileType = fileTypeArray[fileTypeArray.length - 1]

			let obj = {
				"fileName": fileName, // "文件名",
				"objectId": _this.objectId, // "业务实体编号（没有不传）",
				"type": _this.objectType, // "上传的objectType",
				"kind": _this.kind, // "上传的kind",
				"filePath": _this.FileHost + uploadInfo.object, // "上传的path",  // 0/temp/157361628933133.png
				"fileType": uploadInfo.file.type ? uploadInfo.file.type : fileType, // "文件类型",
				"isOssTemp": _this.objectId ? 0 : 1, // "没有objectId传1，否则传0"
			}
			console.log(obj)
			_this.saveAttachment(obj)
			// _this.$emit('hasUploadFile', )  
		},
		// 文件上传进度
		onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
			_this.$set(_this.uploadProgress, uploadInfo.object, Math.ceil((uploadedSize * 100) / totalSize))
			console.log("onUploadProgress:file:" + uploadInfo.file.name + ", percent:" + Math.ceil((uploadedSize * 100) / totalSize) + "%");
		},
		// STS临时账号会过期，过期时触发函数
		onUploadTokenExpired: function(uploadInfo) {
			console.log("onUploadTokenExpired");
			// 实现时，从新获取STS临时账号用于恢复上传
			stsToken = httpGet(httpServer, callback);
			uploader.resumeUploadWithToken(
				stsToken.AccessKeyId,
				stsToken.AccessKeySecret,
				stsToken.SecurityToken,
				stsToken.Expiration
			);
		},
		// 开始上传
		onUploadstarted: function(uploadInfo) {
			// console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
		}
	});

	// var httpServer = document.getElementById("httpServer").value;
	// result = httpGet(httpServer);
	// stsToken = JSON.parse(result);

	if (null == stsToken || stsToken.status != 200) {
		alert("服务端请求STS失败");
		return;
	}
	// OSS直接上传:STS方式，安全但是较为复杂，建议生产环境下使用。
	// 临时账号过期时，在onUploadTokenExpired事件中，用resumeWithToken更新临时账号，上传会续传。
	uploader.init(
		stsToken.AccessKeyId,
		stsToken.AccessKeySecret,
		stsToken.SecurityToken,
		stsToken.Expiration
	);
}
export default {
	name: "cosUpload",
	props:{
		objectType:{ //获取token接口的参数  customer/student/office
			type:String,
			required: true
		},
		objectId:{ //获取token接口的参数  业务实体编号
			type:String,
			default: ''
		},
		kind:{ //获取token接口的参数  image、file、video业务种类（录音、合同、头像、图片、视频、音频....）
			type:String,
			required: true
		},
		multiple:{//是否支持多选,默认可多选
			type:Boolean,
			default: true
		},
		accept:{ //文件支持类型。允许的文件后缀名，小写，不带.
			type: Array,
			default: []
		},
		maxNum:{
			type: Number, //最大上传个数，默认为9
			default: 9
		},
		uploadButtonName:{ //上传按钮文字
			type: String,
			default: '选择上传文件'
		},
		maxSize:{
			type: Number, //最大文件大小，默认20M
			default: 20
		},
		fileInputId:{
			type: String, 
			required: true
		},
		isChangeFile: {
			type:Boolean,
			default: false
		},
		showButton: {
            type: Boolean,
            default: true
        },
	},
	data() {
		return {
			fileList:[],
			uploadProgress:{},
			openList: true,
			OSSDirPath: '',
			FileHost: '',
		};
	},
	computed: {
		...mapState(["userInfo"])
	},
	components: {},
	mounted() {
		_this = this
		this.uploadStsToken()
		// document.getElementById("cosUpload").addEventListener("change", function(event) {
		setTimeout(()=>{
			document.getElementById(_this.fileInputId).addEventListener("change", function(event) {
				if (!uploader) {
					init();
				}

				let endpoint = 'http://oss-cn-beijing.aliyuncs.com';
				var bucket = 'athena-cos';
				var userData =''
					//'{"Vod":{"Title":"this is title.我是标题","Description":"this is desc.我是描述","CateId":"19","Tags":"tag1,tag2,标签3","UserData":"user data"}}';

				let noAccept = false //文件格式校验标志位
				let maxNumFail = false  //文件个数限制标志位
				let noMaxSize = false  //文件大小限制标志位
				for (var i = 0; i < event.target.files.length; i++) {
					console.log("add file: " + event.target.files[i].name);
					let fileName = event.target.files[i].name
					let fileSize = event.target.files[i].size
					let fileTypeArr = fileName.split('.')
					let fileType = fileTypeArr[fileTypeArr.length - 1].toLocaleLowerCase()
					let fileNameDate = new Date().getTime() + fileName
					if(_this.accept.length && _this.accept.indexOf(fileType) < 0){
						noAccept = true //文件格式校验不通过
					} else if (fileSize > _this.maxSize * 1024 * 1024){
						noMaxSize = true //文件超出限制大小
					} else {
						if(_this.isChangeFile && _this.maxNum == 1){ //替换，非追加
							_this.fileList=[{fileName:fileName ,fileNameDate: _this.OSSDirPath + '/' + fileNameDate }]
							uploader.deleteFile(0);
							uploader.addFile(
								event.target.files[i],
								endpoint,
								bucket,
								_this.OSSDirPath + '/' + fileNameDate,
								userData
							);
						} else {
							if(_this.fileList.length >= _this.maxNum){
								maxNumFail = true
							} else {
								_this.fileList.push({fileName:fileName ,fileNameDate: _this.OSSDirPath + '/' + fileNameDate })
								uploader.addFile(
									event.target.files[i],
									endpoint,
									bucket,
									_this.OSSDirPath + '/' + fileNameDate,
									userData
								);
							}
						}
					}
				}
				if(noAccept){
					_this.$Message.error('请选择以下格式的文件：'+ _this.accept.join(','))
				}
				if(maxNumFail){
					_this.$Message.error('最多支持上传' + _this.maxNum + '个文件')
				}
				if(noMaxSize){
					_this.$Message.error('请选择' + _this.maxSize + 'M以下的文件')
				}

				// if(_this.maxNum == 1 && !noAccept && !maxNumFail && !noMaxSize){ //只允许一个文件。自动上传
				// 	_this.startUpload()
				// }
				_this.startUpload() // 屏蔽开始上传按钮后，选择文件后直接上传
				document.getElementById(_this._fileInputId).value = null;
			});
		},1000)
	},
	methods: {
		...mapMutations(["updateLoadingStatus"]),
		reset(){
			this.fileList = []
			this.uploadProgress = {}
			let list = uploader ? uploader.listFiles() : [];
			list.forEach((item,index) => {
				uploader.deleteFile(index)
			});
		},
		saveAttachment(attachmentObj){
			sysAttachment.save(
				attachmentObj
			).then(valid.call(this))
			.then(res => {
					if (res.ok) {
						this.$emit('hasUploadFile', res.data.data)
					}
				}
			)
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		uploadStsToken(){
			sys.uploadStsToken(
				{
					objectType: this.objectType,
					objectId: this.objectId,
					kind: this.kind
				}
			).then(valid.call(this))
			.then(res => {
					if (res.ok) {
						stsToken = res.data.data;
						this.OSSDirPath = stsToken.OSSDirPath
						this.FileHost = stsToken.FileHost
					}
				}
			)
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		},
		openUploadFile() {
			// this.$el.querySelector("#" + this.fileInputId).click();
			document.getElementById(this.fileInputId).click();
		},
		startUpload(){
			if (uploader) {
				uploader.startUpload();
			}
		},
		stopUpload(){
			if (uploader) {
				uploader.stopUpload();
				//因为有的时候暂停会导致文件失败，显示上传完成但是失败，所以暂停后需要，获取文件状态，并标记假完成状态的为暂停状态
				this.getFileResultList(1)
			}
		},
		deleteFileFromParent(index){
			if (uploader) {
				this.fileList.splice(index,1)
				uploader.deleteFile(index);
			}
		},
		deleteFile(index){
			if (uploader) {
				this.fileList.splice(index,1)
				this.$emit('delFromUpload', index)
				uploader.deleteFile(index);
			}
		},
		getFileResultList(type){
			var list = uploader ? uploader.listFiles() : [];
			console.log(list)
			let allSuccess = true
			let fileList = []
			let hasReady = false
			for (var i=0; i<list.length; i++) {
				if(list[i].state != 'Success'){
					allSuccess = false
				}
				if(type == 1 && list[i].state == 'Stoped'){
					this.$set(this.uploadProgress, list[i].object, -2)
				}
				if(type == 2 && list[i].state == 'Ready'){
					hasReady = true
				}
				fileList.push(list[i].object)
			}
			if(hasReady){//失败后检测到还有准备上传的，则再次调用上传。因为异常情况下，会暂停掉剩余的上传
				console.log('fail again upload')
				setTimeout(()=>{
					this.startUpload()
				},100)
			}
			return {
				allSuccess,
				fileList
			}
		},
	},
};
</script>
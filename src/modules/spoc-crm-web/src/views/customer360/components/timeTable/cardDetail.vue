<style lang="less">
.card-detail-container {
	position: relative;
}
</style>
    
<template>
	<div class="card-detail-container">
        <!-- 766 【变更】客户 360-学员课表，显示课次信息排版需优化 -->
        <!-- <p class="p">
            {{`${item.detail.classCourseName} ${item.detail.startTime}-${item.detail.endTime} ${item.detail.classRoomName}`}}
        </p> -->
        <p class="p">{{item.detail.classCourseName}}</p>
        <p class="p">{{`${item.detail.startTime}-${item.detail.endTime}`}}</p>
        <p class="p">{{item.detail.classRoomName}}</p>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object
		},
		headerLists: {
			type: Array
		},
		index1: {
			type: Number
		},
		date: {
			type: String
		}
	}
};
</script>



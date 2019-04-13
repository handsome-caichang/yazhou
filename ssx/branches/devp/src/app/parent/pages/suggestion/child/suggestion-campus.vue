<!-- 投诉与建议-选择校区 -->
<style scoped lang="scss">
    
    
    .card{
        height: 44px;
        line-height: 44px;
        padding: 0 12px;
        color: $color-3-s;
        @include ellipsis-single;
        @include flex-between;
        &.lighHeight{
            color: $color-primary;
        }
    }
</style>

<template>
    <action-sheet
        v-show="opened"
        @close="close"
        :position="position"
        :data="campusData">
        <div 
        	class="card"
        	:class="curCampuId == campus.ID?'lighHeight':''"
        	v-for="campus in campusList"
        	@click="changeCampus(campus)">
            <span>{{campus.CampusName}}</span>
            <svg v-if="curCampuId == campus.ID" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: 'suggestion-campus',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            position: {
                default: 'bottom',
            },
            header: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: false
            },
            campusList:{}
        },
        data() {
            return {
                curCampuId:null
            }
        },
        computed: {
            campusData() {
                return {
                    opened: this.opened
                }
            }
        },
        methods: {
            changeCampus(card){
                this.curCampuId = card.ID;
                this.$emit('suggestionCampu',card);
                this.close();
            }
        }
    }
</script>
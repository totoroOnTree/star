/*
* jq基础扩展组件
*/
(function(){

	$.fn.evaluation=function(option){

		if (!isValid(option))
		return this;
		
		var defalut={
			count:4,
			tips:"差评,一般,好,非常好",//['不重要不紧急','重要不紧急','不重要紧急','重要紧急']
			defalut:2,
			container:$(this).parent()
		};

		var opts = $.extend({}, defalut, option);
		return this.each(function(){
			var _this=this;
			var starCont=$("<div class='ifly-star-grade'></div"),tips=opts.tips.split(',');
			
			$(_this).val(parseInt(opts.defalut));

			for(i=1;i<=parseInt(opts.count);i++){
				starCont.append('<span tips="'+tips[i-1]+'" '+(i <= opts.defalut && ('class="ifly-on"'))+'></span>')
			}
			opts.container.append(starCont);

			var starWap=opts.container.children('.ifly-star-grade');
			starWap.mouseleave(function(event) {
				var num=parseInt($(_this).val())-1;
				var item=$(this).children().eq(num);
				item.addClass('ifly-on').prevAll().addClass('ifly-on');
				item.nextAll().removeClass('ifly-on');
			});
			
			starWap.children('span').mouseenter(function(event) {
				$(this).nextAll().removeClass('ifly-on');
				$(this).addClass('ifly-on').prevAll().addClass('ifly-on');
			});
			starWap.children('span').click(function(){
				$(_this).val($(this).index()+1)
			})

		})	
	}

	function isValid(options) {
		return !options || (options && typeof options === "object") ? true : false;
	}

})()
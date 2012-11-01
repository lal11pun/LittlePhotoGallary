//better version of image slider, accept image collections, use "space" to pause/resume
//images items:{name, width, height, url}
//options:{interval, callback}

(function($){
	$.fn.imageslider = function(images, options){
		//define the default values of options
		var defaults = {
			'interval': 3000,
			'callback': null
		}
				
		var parameters =$.extend(defaults, options);
		var len = images.length;
		
		
		return this.each(function(){
			var self = this;

			for(var i=0; i<len; i++){
				var defaults_img = {
					'name': "No title",
					'width': '300px',
					'height': '150px'
				}
				var params = $.extend(defaults_img, images[i]);
				var img = document.createElement('img');

				img.style.display = "none";
				img.style.width  = params.width;
				img.style.height = params.height;
				img.alt = params.name;
				img.src = params.url;			
				self.appendChild(img);
			}
			// set count 
			var count = -1;
			
			var allwidth = $(self).parent().width();
			var rotate = function(){
				//console.log(count);
				if(count == -1){
					self.style.left = (allwidth-$(self).find('img:eq(0)').width())/2 + 'px';
					$(self).find('img:eq(0)').fadeIn(function(){
						if(typeof parameters.callback === 'function'){
							parameters.callback(this);
						}
					});
					count+=1;
				}
				else{
					$(self).find('img:eq('+count+')').fadeOut(function(){
						count +=1;
						
						if(count > len-1){
							count = 0;
						}
							
						self.style.left = (allwidth-$(self).find('img:eq('+count+')').width())/2 + 'px';
						$(self).find('img:eq('+count+')').fadeIn(function(){
							if(typeof parameters.callback === 'function'){
								parameters.callback(this);
							}
						});
						
					});
				}	

			}
			var timeinterval = setInterval(rotate, parameters.interval);
			
			var play = true;
			$(document).keydown(function(e){
				e.preventDefault();
				console.log(e.keyCode);
				if(e.keyCode === 32){
					if(play){
						play = false;
						clearInterval(timeinterval);
						$('#pause').css('display','block').css('text-decoration','blink');
						
					}
					else{
						play = true;
						timeinterval =setInterval(rotate, parameters.interval); 
						$('#pause').hide();
					}
				}
			});
			
		});		
	};	
})(jQuery);
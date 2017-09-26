var websites = [
	"climate",
	"weather",
	"niche",
	"predation",
	"symbiosis",
	"sucession",
	"biome",
	"biocube"
];
var locationName;
function getContent(title){
/*
	var remotePhrases = [];
	var phraseNum = 0;
	$('iframe').each(function(){
		var remoteContent = $(this).contents();
		if($(remoteContent).find("i." + title).length > 0){
			var remotePhrase = $(remoteContent).find("i." + title);
			remotePhrases[phraseNum] = remotePhrase;
			phraseNum++;	
		}
	});
*/
	var iframeContent = $('iframe.' + title).contents();
	var phrase = $(iframeContent).find('i.' + title);
	//remoteContent.find('html').replaceWith(remotePhrase);
	return phrase;	
}

function createHovers(website){
	console.log('Website: ' + website);
	var match = false;
	$('span').each(function(index){
		var target = $(this).data('target');
		var text = this.innerHTML;
		console.log('Target: ' + target);
		console.log('Span Index:' + index);
		if(target != undefined && target == website){
		match = true;
		var tooltip = document.createElement("a");
		tooltip.innerHTML = text;
		$(tooltip).addClass('tooltipped');
		$(tooltip).attr('data-position', 'bottom');
		$(tooltip).attr('data-delay', '50');

		var targetText = getContent(target).html();
			console.log(target + ' Text: ' + targetText);
		/*		
		var content = getContent(target);
		for(i in content){
			targetText += content[i].text();
		}
*/
		//getContent(target).html()
		//var elementText = document.createElement('p');
		//$(elementText).html("<p>" + targetText + "</p>");
		$(tooltip).attr('data-tooltip', targetText);
		$(tooltip).attr('onclick', 'openModal("' + target + '", "iframe.' + target + '")');	
		$(this).replaceWith(tooltip);
		$('.tooltipped').tooltip({delay: 50, html: true});
		}
		console.log('Match Found: '  + match);
	});
	for(site in websites){
		websiteName = websites[site];
		if(websiteName == website){
			websites.splice(site, 1);
		}else if(websiteName == locationName){
			websites.splice(site, 1);
		}	
	}
	checkWebsite();
}

function openModal(title, iframe){
	$('#define-modal').find('.modal-content').append('<div class="replace-me"></div>');
	$('#define-modal').modal('open').find('.replace-me').html($(iframe).contents().find('p').html());
	$('#define-modal').find('i.' + title).each(function(){
		$(this).css('background-color', 'yellow');
	});
	$('#define-modal').find('.modal-footer').html('<div class="modal-footer"><a class="btn btn-floating pulse tooltipped" href="' + title  + '.html?highlight=' + title + '" data-tooltip="Go there" data-position="top"><i class="material-icons">chevron_right</i></a></div>');
	$('.tooltipped').tooltip({delay: 50, html: true});
}
$('document').ready(function(){
	locationName = window.location.pathname;
	locationName = locationName.replace('/', '');
	locationName = locationName.replace('.html', '');
	if(self != top){
		$('document').ready(function(){
			parent.createHovers(locationName);
		});
	}else{
	$(document).find('body').append('<div id="define-modal" class="modal bottom-sheet"><div class="modal-content"></div><div class="modal-footer"></div></div>');
	$('.modal').modal({
		complete: function(){
			$('#define-modal').find('.modal-content').html('');
			$('#define-modal').find('.modal-footer').html('<div class="modal-footer"></div>');
		}
	});
	var url = new URLSearchParams(window.location.search);
	var highlight = url.get("highlight");
	if(highlight != null){
		$('i.' + highlight).css('background-color', 'yellow');	
	}else{
		console.log("No Highlight");
	}
	var name = url.get("teacher");
	if(name != 1){
		$('.brand-logo').html('');
	}
	checkWebsite();
	$(document).find('.loading').append('<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"> <div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>');
	switch(locationName){
		case 'climate':
			var img = $(document).add('img').
			img.attr('src', 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjxl4fmp8PWAhUExFQKHaYFBWkQjRwIBw&url=https%3A%2F%2Fwww.nasa.gov%2Fpress-release%2Fnasa-releases-detailed-global-climate-change-projections&psig=AFQjCNEJPMsuzGFQYVMOcwdMm-P701PvyA&ust=1506531087769842');
			$('.parallax').append(img);
			break;
		case default:
			break;
	}
}
$('.parallax').parallax();
	
});

if(self == top){
for(site in websites){
	var iframe = document.createElement('iframe');
	//$(document).find('.iframes').append('<iframe></iframe>').attr('src', '/' + websites[site] + '.html');
	siteName = websites[site];
	$(iframe).attr('src', siteName + '.html');
	$(iframe).addClass(siteName);
	$(document).find('.iframes').append(iframe);
}
}
function checkWebsite(){
	if(websites.length == 0){
		$('.loading').html('');
		$('.loading').hide();
	}
}

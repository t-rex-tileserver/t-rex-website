$(document)
  .ready(function() {

    //{# fix menu when passed #}
    $('.masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out');
        }
      })
    ;

    //{# create sidebar and attach to menu open #}
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;

    //{# convert h3 + p within .vtab to https://semantic-ui.com/collections/menu.html#tabular markup #}
    var tabs = $(".vtab");
    var vtabgrid=$('<div class="ui grid vtab"><div class="four wide column"><div class="ui vertical fluid tabular menu"></div></div><div class="eleven wide stretched column"></div></div>');
    vtabgrid = vtabgrid.insertBefore(tabs.first());
    tabs.each( function( index, element ){
      var tab = $( this );
      var active = (index == 0);
      var link = $('<a class="item">'+tab.find("h3").text()+"</a>");
      link.attr('data-vtabid', tab.find("h3").attr('id'));
      if (active) link.addClass('active');
      vtabgrid.find(".menu").append(link);
      var content = $('<div class="vtabcontent"/>').append(tab.find("h3").siblings());
      content.attr('data-vtabid', tab.find("h3").attr('id'));
      if (!active) content.hide();
      vtabgrid.find(".stretched").append(content);
    });
    tabs.remove();
    vtabgrid.find('a.item').on('click', function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $(this).parent().parent().parent()
        .find(".vtabcontent").hide();
      $(this).parent().parent().parent()
        .find("[data-vtabid="+$(this).attr('data-vtabid')+"]").show()
    });
  })
;

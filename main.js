$(document).ready(function() {

  var links = ["http://www.npr.org/2015/09/23/439514986/first-listen-wavves-v", "http://www.npr.org/2015/09/23/442274312/first-listen-autre-ne-veut-age-of-transparency", "http://www.npr.org/2015/09/20/439491238/first-listen-chvrches-every-open-eye", "http://www.npr.org/2015/09/16/436304229/first-listen-dungen-allas-sak", "http://www.npr.org/2015/09/02/436304494/first-listen-petite-noir-la-vie-est-belle-life-is-beautiful", "http://www.npr.org/2015/09/02/436304859/first-listen-gary-clark-jr-the-story-of-sonny-boy-slim", "http://www.npr.org/2015/09/16/439181153/first-listen-los-lobos-gates-of-gold", "http://www.npr.org/2015/09/16/439491704/first-listen-youth-lagoon-savage-hills-ballroom", "http://www.npr.org/2015/09/09/438655152/first-listen-windhand-griefs-infernal-flower", "http://www.npr.org/2015/09/09/438581988/first-listen-yo-yo-ma-kathryn-stott-songs-from-the-arc-of-life"];
  var context = {
    embedLinks: [],
    expiredLinks: []
  }

  for (var i = 0; i < links.length; i++) {
    $.ajax({
      url: links[i],
      success: function(result) {
        var tracks = $(result).find("input.embed-url");
        if (tracks[0] != undefined) {
          var firstEmbed = tracks[0].defaultValue;
          var title = $(result).find("article.story h1")[0].innerText;

          var entry = {title: title, iframe: firstEmbed};

          context.embedLinks.push(entry);
          //console.log(context.embedLinks);
        } else {
          var title = $(result).find("article.story h1")[0].innerText;
          var archiveLink = $(result).find('#disqus-npr').attr('data-url');
          //console.log('archive: ' + archiveLink);
          var url = archiveLink;

          var entry = {title: title, url: url};
          context.expiredLinks.push(entry);
          //console.log(context.expiredLinks);
        }


        if (links.length == context.embedLinks.length + context.expiredLinks.length) {
          render();
        }
      }
    });
  }

  function render() {
    var nowPlayingTemplateScript = $("#entry-template").html();
    var nowPlayingTemplate = Handlebars.compile(nowPlayingTemplateScript);
    $('.now-playing').append(nowPlayingTemplate(context.embedLinks));

    var archiveTemplateScript = $('#archive-template').html();
    var archiveTemplate = Handlebars.compile(archiveTemplateScript);
    $('.archive').append(archiveTemplate(context.expiredLinks));
  }

//everything above here
});

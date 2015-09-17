$(document).ready(function() {

//this one's not quite right though
  // var context = {
  //   links: [
  //     {title: "Windhand, 'Grief's Infernal Flower'", url: "http://www.npr.org/2015/09/09/438655152/first-listen-windhand-griefs-infernal-flower"},
  //     {title: "Yo-Yo Ma & Kathryn Stott - 'Songs From The Arc Of Life'", url: "http://www.npr.org/2015/09/09/438581988/first-listen-yo-yo-ma-kathryn-stott-songs-from-the-arc-of-life"}
  //   ]
  // }

  var links = ["http://www.npr.org/2015/09/02/436304494/first-listen-petite-noir-la-vie-est-belle-life-is-beautiful", "http://www.npr.org/2015/09/02/436304859/first-listen-gary-clark-jr-the-story-of-sonny-boy-slim", "http://www.npr.org/2015/09/16/439181153/first-listen-los-lobos-gates-of-gold", "http://www.npr.org/2015/09/16/439491704/first-listen-youth-lagoon-savage-hills-ballroom", "http://www.npr.org/2015/09/09/438655152/first-listen-windhand-griefs-infernal-flower", "http://www.npr.org/2015/09/09/438581988/first-listen-yo-yo-ma-kathryn-stott-songs-from-the-arc-of-life"];

  var context = {
    embedLinks: [],
    expiredLinks: []
  }

  for (var i = 0; i < links.length; i++) {
    $.ajax({
      url: links[i],
      success: function(result) {
        var currentUrl = links[i];
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
          console.log('archive: ' + archiveLink);
          var url = archiveLink;

          var entry = {title: title, url: url};
          context.expiredLinks.push(entry);
          console.log(context.expiredLinks);
          console.log(currentUrl);
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

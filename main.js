$(document).ready(function() {

//this one's not quite right though
  // var context = {
  //   links: [
  //     {title: "Windhand, 'Grief's Infernal Flower'", url: "http://www.npr.org/2015/09/09/438655152/first-listen-windhand-griefs-infernal-flower"},
  //     {title: "Yo-Yo Ma & Kathryn Stott - 'Songs From The Arc Of Life'", url: "http://www.npr.org/2015/09/09/438581988/first-listen-yo-yo-ma-kathryn-stott-songs-from-the-arc-of-life"}
  //   ]
  // }

  var links = ["http://www.npr.org/2015/09/16/439181153/first-listen-los-lobos-gates-of-gold", "http://www.npr.org/2015/09/16/439491704/first-listen-youth-lagoon-savage-hills-ballroom", "http://www.npr.org/2015/09/09/438655152/first-listen-windhand-griefs-infernal-flower", "http://www.npr.org/2015/09/09/438581988/first-listen-yo-yo-ma-kathryn-stott-songs-from-the-arc-of-life"];

  var context = {
    embedLinks: []
  }

  for (var i = 0; i < links.length; i++) {
    $.ajax({
      url: links[i],
      success: function(result) {
        var tracks = $(result).find("input.embed-url");
        //console.log(tracks[0].defaultValue);
        var firstEmbed = tracks[0].defaultValue;
        var title = $(result).find("article.story h1")[0].innerText;

        var entry = {title: title, iframe: firstEmbed}

        context.embedLinks.push(entry);

        if (links.length == context.embedLinks.length) {
          render();
        }
      }
    });
  }

  console.log(context.embedLinks);
  function render() {
    var templateScript = $("#entry-template").html();
    var template = Handlebars.compile(templateScript);
    $('.now-playing').append(template(context.embedLinks));
  }

//everything above here
});

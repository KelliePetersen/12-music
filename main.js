$(document).ready(function() {
  let key = "AIzaSyD1ZBaqZAlaGiylTH7Oi7Cy97_SEby-BDI";
  let playlistId = "PLJ19iZsXIWCGEPgGiCm_ySuko9qg1e2aS";
  let URL = "https://www.googleapis.com/youtube/v3/playlistItems";

  let options = {
    part: "snippet",
    key: key,
    maxResults: 12,
    playlistId: playlistId
  };

  loadVideos();

  function loadVideos() {
    $.getJSON(URL, options, function(data) {
      let id = data.items[0].snippet.resourceId.videoId;
      mainVideo(id);
      thumbnails(data);
    });
  }

  function mainVideo(id) {
    $("#video").html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1&cc_load_policy=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
  }

  function thumbnails(data) {
    $.each(data.items, function(i, item) {
      let thumb = item.snippet.thumbnails.medium.url;
      let title = item.snippet.title;
      let description = item.snippet.description;
      if (description.length > 100) {
        description = description.substring(0, 100);
        description += '...';
      }
      let video = item.snippet.resourceId.videoId;
      $("main").append(`
      <article class="item" data-key="${video}">
        <img src="${thumb}" alt="" class="thumb">
        <div class="details">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      </article>`);
    });
  }
  $("main").on("click", "article", function() {
    let id = $(this).attr("data-key");
    mainVideo(id);
  });
});
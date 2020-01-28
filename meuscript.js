var nomeCanal;
var upload_id;
var canalId;

function procura() {
    nomeCanal = document.getElementById("nick").value;
    document.getElementById("lista").innerHTML = "";
    $.get('https://www.googleapis.com/youtube/v3/search', {
        part: 'snippet',
        maxResults: 5,
        q: nomeCanal,
        key: 'AIzaSyA1dG98OLviyoXMG_BEs14v9rT9Y5kyu0g'
    },
        function (data) {
            console.log(data);
            $.each(data.items, function (i, item) {
                if (data.items[i].snippet.channelTitle.toUpperCase().trim() == nomeCanal.toUpperCase().trim()) {
                    canalId = data.items[i].id.channelId;
                    pegarUp();
                    return false;
                }
            });
        }
    )

    function pegarUp() {
        $.get('https://www.googleapis.com/youtube/v3/channels', {
            part: 'contentDetails',
            id: canalId,
            key: 'AIzaSyA1dG98OLviyoXMG_BEs14v9rT9Y5kyu0g'
        },
            function (data) {
                upload_id = data.items[0].contentDetails.relatedPlaylists.uploads;
                pegaVideos(upload_id);
            })

    }

    function pegaVideos(id) {
        $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            part: 'snippet',
            maxResults: 12,
            playlistId: id,
            key: 'AIzaSyA1dG98OLviyoXMG_BEs14v9rT9Y5kyu0g'
        },
            function (data) {
                console.log(data);
                var imagem;
                var arquivo;
                var titulo;
                var descricao;
                var video;
                $.each(data.items, function (i, item) {
                    imagem = item.snippet.thumbnails.medium.url;
                    titulo = item.snippet.title;
                    descricao = item.snippet.description;
                    video = item.snippet.resourceId.videoId;
                    arquivo = '<li class="principal"><a href=" https://www.youtube.com/watch?v=' + video + '"><div class="foto"><img src="' + imagem + '"/><div class="legenda"><h5>' + titulo + '</h5><p>' + descricao + '</p></div></div></></li>';
                    $('div#janela ul').append(arquivo);
                });
            }
        )
    }

    function pegarInf() {

    }
};


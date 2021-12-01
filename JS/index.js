$(document).ready(()=>{
    // https://twitter.com/BCCI/status/1456461601804939272?s=20
    // https://twitter.com/awscloud/status/1456368494388330496?s=20
    // https://twitter.com/imVkohli/status/1460467274016387076?s=20

    // extracting the tweet post unique id
    function check_link(link){
        if(link.split("https://twitter.com/")[0] == ""){
            let temp_lst = link.split("/")
            let temp_postid = temp_lst[temp_lst.length-1].split("?")[0]
            return temp_postid
            
        }
        else{
            return null
        }
    }
    
    // alert function
    function alert_func(){
        $("#alert").html("Please enter a valid tweet link :(").fadeIn()
        $(".blur").css({
                    "background":"rgb(255, 0, 0,.6)",
                    "transition":"color 0.30s linear",
                    "transition" : "background 0.30s linear"
        })
        // $(".blur").css("background","rgb(255, 0, 0,.6)")
        setTimeout(
            ()=>{
                $("#alert").fadeOut()
                $(".blur").css({
                    "background":"rgb(255, 255, 255,.2)",
                    "transition":"color 0.30s linear",
                    "transition" : "background 0.30s linear"
        })
            },3500
        )
    }

    function onclick_send_button(){
        $("#send_button").on("click",()=>{
            // getting the link
            let link = $("#link_input").val()
            // balnking the input section and tweet section
            $("#link_input").prop("value","")
            $("#tweet_image").html('')
            let post_id = check_link(link)
            if(post_id == null || post_id == ""){
                alert_func()
            }
            else{
                let ajax = $.ajax(
                    server_url["tweetlink"],
                    {
                        method : "post",
                        data : {
                            "tweetid" : post_id
                        }
                    }
                )
                ajax.done((msg)=>{
                    if(msg.success){
                        // all data coming from the backend
                        // console.log(msg)
                        // console.log(msg["data"]['html'])
                        // adding the embedded link of tweet
                        $("#tweet_image").html(msg["data"]["html"])
                    }
                    if(msg.error)[
                        alert_func()
                    ]
                })
                ajax.fail((msg)=>{
                    console.log(msg)
                })
            }
        })
    }

    // server url
    // const server = "http://127.0.0.1:8000"
    const server = "https://crabsnilawstest.herokuapp.com/twitter"
    const server_url = {
        "tweetlink" : `${server}/tweetlink`
    }


    // calling function
    onclick_send_button()


})
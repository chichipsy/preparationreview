$(function () {
    var users = new Map([["guest", 12345678]]);
    var login = false;
    var len = $("#head .carousel").length;
    var vis = 1;
    var open = false;
    var nav = $("#head .navs").offset().top;
    var icon = $("#info").offset().top - 500;
    var qa = 0;
    var shop = new Map();
    var sections = ["head", "info", "news", "shop", "contact"];
    var active = {
        "1": ["2023/03/01", "開幕式"],
        "14": ["2023/03/14", "文化交流日"],
        "24": ["2023/03/24", "藝術探索之旅"],
    }
    var cus_opan = false;

    $(".mobile").click(function (e) { 
        window.open("index.html", "_blank", "width=480, height=886");
    });
    $(".tablet").click(function (e) { 
        window.open("index.html", "_blank", "width=800, height=886");
    });
    $("a[href='#']").click(function (e) { 
        e.preventDefault();
    });

    function cus(){
        let input = $("#user_input").val();
        let ans = "問題已發至後台，感謝您的回饋!!";
        $("#user_input").val("");
        if(input.length > 0){
            let user = `
            <div class="user flex"><p>${input}</p><i class="fa-solid fa-user"></i></div>
            `
            let robot = `
            <div class="robot flex"><i class="fa-solid fa-robot"></i><p>${ans}</p></div>
            `
            $(".cus_page .record").append(user);
            $(".cus_page .record").scrollTop($(".cus_page .record")[0].scrollHeight);
            setTimeout(() => {
                $(".cus_page .record").append(robot);
                $(".cus_page .record").scrollTop($(".cus_page .record")[0].scrollHeight);
            }, 800);
        }
    }

    $(".cus").click(function (e) { 
        $(".cus_page").css("display", "block");
        $(".cus_page").animate({
            opacity: "1",
        }, 500);
        cus_opan = true;
    });

    $("#close").click(function (e) { 
        $(".cus_page").animate({
            opacity: "1",
        }, 500, function(){
            $(".cus_page").css("display", "none");
        });
        cus_opan = false;
    });

    $(".cus_page span i").click(function (e) { 
        cus();
    });

    $("#user_input").keydown(function (e) { 
        if(e.keyCode === 13){
            cus();
        }
    });

    $(window).scroll(function () { 
        let st = $(this).scrollTop();
        if(st >= nav){
            $("#head .navs").addClass("fixed");
        }else{
            $("#head .navs").removeClass("fixed");
        }
        if (st >= icon) {
            $(".fixed_icon").css("display", "flex");
        } else {
            $(".fixed_icon").css("display", "none");
            if(cus_opan){
                $(".cus_page").animate({
                    opacity: "1",
                }, 500, function(){
                    $(".cus_page").css("display", "none");
                });
                cus_opan = false;
            }
        }
        if(st + $(window).height() == $(document).height()){
            $(".navs ul a").removeClass("active");
            $(".navs ul a").eq(4).addClass("active");
        }else{
            for(let i = 0; i < sections.length; i++){
                if(i != 3){
                    var next = $("#" + sections[i + 1]).offset().top
                }else{
                    next = 10000;
                }
                if(st >= $("#" + sections[i]).offset().top & st < next){
                    $(".navs ul a").removeClass("active");
                    $(".navs ul a").eq(i).addClass("active");
                    break;
                }
            }
        }
    });

    $(".calendra").click(function (e) { 
        $("#calendra").css("display", "flex");
        $("#calendra .page").animate({
            top: "0",
            opacity: "1",
        }, 500);
    });

    $("#calendra").click(function (e) { 
        if(e.target === this){
            $("#calendra .page").animate({
                top: "-200",
                opacity: "0",
            }, 500, function(){
                $("#calendra").css("display", "none");
                $("#calendra .page .f").css("transform", "rotateY(0deg)");
                $("#calendra .page .b").css("transform", "rotateY(-180deg)");
            });
        }
    });

    $("#calendra .f .dates .date.active").click(function (e) { 
        let day = $(this).text();
        $("#calendra .b h1").text(active[day][1]);
        $("#calendra .b p").text(active[day][0]);
        $("#calendra .page .f").css("transform", "rotateY(180deg)");
        $("#calendra .page .b").css("transform", "rotateY(0deg)");
    });

    $("#ok").click(function (e) { 
        let name = $("#name").val();
        let pn = $("#pn").val();
        if(name.length >= 0 & pn.length >= 0){
            alert("報名成功" + name + "先生/小姐");
            $("#calendra .page").animate({
                top: "-200",
                opacity: "0",
            }, 500, function(){
                $("#calendra").css("display", "none");
                $("#calendra .page .f").css("transform", "rotateY(0deg)");
                $("#calendra .page .b").css("transform", "rotateY(-180deg)");
            });
        }else{
            alert("請正確填寫資料!");
        }
    });

    $("#no").click(function (e) { 
        $("#calendra .page .f").css("transform", "rotateY(0deg)");
        $("#calendra .page .b").css("transform", "rotateY(-180deg)");
    });

    function vfi(){
        $("#vip").css("display", "flex");
        $("#vip .page").animate({
            top: "0",
            opacity: "1",
        }, 500);
    }

    function vfo(){
        $("#vip .page").animate({
            top: "-200",
            opacity: "0",
        }, 500, function(){
            $("#vip").css("display", "none");
        });
    }
    $(".vip").click(function (e) { 
        if (login) {
            alert("登出成功!");
            $(".vip span").text("登入");
            login = false;
        } else {
            vfi();
        }
        
    });
    $("#vip").click(function (e) { 
        if(e.target === this){
            vfo()
        }
    });

    $("#ls").click(function (e) { 
        $("#vip .page .f").css("transform", "rotateY(180deg)");
        $("#vip .page .b").css("transform", "rotateY(0deg)");
    });

    $("#sl").click(function (e) { 
        $("#vip .page .f").css("transform", "rotateY(0deg)");
        $("#vip .page .b").css("transform", "rotateY(-180deg)");
    });

    $("#ll").click(function (e) { 
        let user = $("#lu").val();
        let pw = $("#lp").val();
        if (users.has(user)) {
            if(users.get(user) == pw){
                $("#lu").val("");
                $("#lp").val("");
                alert("登入成功");
                login = true;
                $(".vip span").text("登出");
                vfo();
            }else{
                alert("密碼錯誤!!")
            }
        } else {
            alert("查無此帳戶!!!")
        }
    });

    $("#ss").click(function (e) { 
        let user = $("#su").val();
        let pw = $("#sp").val();
        let cpw = $("#scp").val();
        if (!users.has(user)) {
            if(pw.length >= 8){
                if (pw == cpw) {
                    $("#su").val("");
                    $("#sp").val("");
                    $("#scp").val("");
                    alert("註冊成功");
                    users.set(user, pw);
                    $("#vip .page .f").css("transform", "rotateY(0deg)");
                    $("#vip .page .b").css("transform", "rotateY(-180deg)");
                } else {
                    alert("密碼前後不符!!");
                }
            }else{
                alert("密碼長度過短(至少要8個字)!!");
            }
        } else {
            alert("此帳戶已被註冊!!!");
        }
    });
    
    function head(){
        $("#head .carousel, #head .theme .dot").removeClass("vis");
        $("#head .theme .dot").eq(vis - 1).addClass("vis");
        $("#head .carousel").eq(vis - 1).addClass("vis");
    }

    setInterval(() => {
        vis = vis == len ? 1 : vis + 1;
        head();
    }, 3000);

    $("#head > i").click(function (e) { 
        let id = $(this).attr("id");
        if(id == "right"){
            vis = vis == len ? 1 : vis + 1;
            head();
        }else{
            vis = vis == 1 ? len : vis - 1;
            head();
        }
    });

    $("#head .theme .dot").click(function (e) { 
        vis = $(this).index() + 1;
        head();
    });

    $(".lines").click(function (e) { 
        if (open) {
            $(".lines .line, .pop").removeClass("open");
            open = false;
        } else {
            $(".lines .line, .pop").addClass("open");
            open = true;
        }
    });

    $(".pop li a").click(function (e) { 
        $(".lines .line, .pop").removeClass("open");
        open = false;
    });

    $(".info-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        items: 1,
    });

    $(".qa i").click(function (e) { 
        let id = $(this).attr("id").substring(2);
        if(qa){
            if (qa == id) {
                $(this).addClass("fa-plus");
                $(this).removeClass("fa-minus");
                $("#info .qa li").removeClass("open");
                qa = 0;
            } else {
                $(".qa i").addClass("fa-plus");
                $(".qa i").removeClass("fa-minus");
                $("#info .qa li").removeClass("open");
                $(this).removeClass("fa-plus");
                $(this).addClass("fa-minus");
                $("#info .qa li").eq(id - 1).addClass("open");
                qa = id;
            }
        }else{
            $(this).removeClass("fa-plus");
            $(this).addClass("fa-minus");
            $("#info .qa li").eq(id - 1).addClass("open");
            qa = id;
        }
    });

    function update_shop(){
        $(".shops").empty();
        let total = 0;
        shop.forEach(function(obj, key){
            let html =  `
                <p>${obj["name"]}X${obj["quantity"]}</p>
            `
            $(".shops").append(html);
            total += obj["quantity"] * obj["price"];
        });
        $(".total").text("合計$" + total);
    }

    $("#shop .product span i").click(function (e) { 
        let ids = $(this).attr("id").substring(0, 1);
        let idn = $(this).attr("id").substring(1);
        let current_quantity = parseInt($("#p" + idn + " span input").val());
        if(ids == "a"){
            $("#p" + idn + " span input").val(current_quantity + 1);
            if (shop.has(idn)) {
                shop.get(idn)["quantity"] += 1;
                update_shop();
            }else{
                let obj = {
                    name: $("#p" + idn + " h1").text(),
                    price: parseInt($("#p" + idn + " p").text().substring(1)),
                    quantity: 1,
                }
                shop.set(idn, obj);
                update_shop();
            }
        }else if(current_quantity > 0) {
            $("#p" + idn + " span input").val(current_quantity - 1);
            if(current_quantity == 1){
                shop.delete(idn);
            }else{
                shop.get(idn)["quantity"] -= 1;
            }
            update_shop();
        }
    });

    $("#clear").click(function (e) { 
        alert("購物車已清空!!");
        $(".product span input").val(0);
        shop.clear();
        update_shop();
    });

    $("#end").click(function (e) { 
        if (shop.size > 0) {
            if (login) {
                alert("結帳成功，登入會員享有9折優惠，實付金額: " + parseInt($(".total").text().substring(3)) * .9 + "!!");
                shop.clear();
                $(".product span input").val(0);
                update_shop();
            } else {
                let yn = confirm("登入會員享有9折優惠，要登入嗎?");
                if (yn) {
                    vfi();
                } else {
                    alert("結帳成功，登入會員享有9折優惠，實付金額: " + parseInt($(".total").text().substring(3)) + "!!");
                    shop.clear();
                    $(".product span input").val(0);
                    update_shop();
                }
            }
        } else {
            alert("購物車是空的!!!");
        }
    });
});
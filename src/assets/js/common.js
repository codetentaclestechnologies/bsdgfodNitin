var bsgAddr = "TSQo8Nn7muPZ78CAjhGCobUnd3m6vLKnNw";
var usdtAddr = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
var refererDefault = "TJizNWpUkhJtLShTj4XKNwJVyheqH35cRx";
var zeroAddr = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";
var bsg;
var usdt;
var userAddr = "";
var autoRefresh = 2000;
var timeStep = 24 * 60 * 60;
var lang = 'default';

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

$(function() {
    setInterval(async() => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            userAddr = window.tronWeb.defaultAddress.base58;
            var userAddrShort = userAddr.substring(0, 6) + "...";
            $(".linkWallet").text(userAddrShort)
            bsg = await tronWeb.contract(bsg_abi, bsgAddr);
            usdt = await tronWeb.contract(erc20_abi, usdtAddr);
            updateCommonInfo()
            setTimeout(function() {
                setInterval(async() => {
                    if (window.tronWeb.defaultAddress.base58 !== userAddr) {
                        userAddr = window.tronWeb.defaultAddress.base58;
                        bsg = await tronWeb.contract(bsg_abi, bsgAddr);
                        usdt = await tronWeb.contract(erc20_abi, usdtAddr);
                        updateCommonInfo()
                    }
                }, 500)
            }, autoRefresh)
        }
    }, autoRefresh);

    async function updateCommonInfo() {
        // 合约地址
        $(".contractAddress").text(bsgAddr);
        // 平台运行时间
        var startTime = parseInt(await bsg.startTime().call()) * 1000;
        var nowTime = (new Date).getTime();
        var runTime = formatDate(startTime, nowTime)
        $(".runTime").text(runTime)
        // 存款倒计时
        var orderLength = parseInt(await bsg.getOrderLength(userAddr).call());
        if(orderLength > 0){
            var {unfreeze} = await bsg.orderInfos(userAddr, orderLength - 1).call();
            var unfreezeTS = parseInt(unfreeze)*1000
            var depositCountDown = formatDate(nowTime, unfreezeTS)
            $(".depositCountDown").text(depositCountDown);
        }else{
            $(".depositCountDown").text("00:00:00");
        }

        // 幸运奖池
        var luckPool = parseInt(await bsg.luckPool().call())/1000000
        $(".luckPool").text("$" + luckPool.toFixed(2))

        // 四星奖池
        var starPool = parseInt(await bsg.starPool().call())/1000000
        $(".starPool").text("$" + starPool.toFixed(2))

        // Top奖池
        var topPool = parseInt(await bsg.topPool().call())/1000000
        $(".topPool").text("$" + topPool.toFixed(2))

        // 最新存款
        var depositCount = parseInt(await bsg.getDepositorsLength().call());
        var recycle = 10;
        if(depositCount < recycle){
            recycle = depositCount
        }

        var index = 0;
        var userMap = new Map();
        for(var i = depositCount; i > depositCount - recycle; i--){
            var userLatestDeposit =tronWeb.address.fromHex(await bsg.depositors(i - 1).call());
            if(!userMap.has(userLatestDeposit)){
                userMap.set(userLatestDeposit, 0);
            }else{
               var val = userMap.get(userLatestDeposit)
               userMap.set(userLatestDeposit, val + 1)
            }
            var userCount = userMap.get(userLatestDeposit);
            var userLatestOrderNum = parseInt(await bsg.getOrderLength(userLatestDeposit).call());
            var {amount, start} = await bsg.orderInfos(userLatestDeposit, userLatestOrderNum - 1 - userCount).call();
            var latestAmount = parseInt(amount)/1000000
            $(".latestDeposit").eq(index).text(userLatestDeposit)
            $(".latestAmount").eq(index).text("$" + latestAmount.toFixed(2))
            // 时间
            var latestStart = getDate(parseInt(start) * 1000) 
            $(".daRizaW").eq(index).text(latestStart)
            index++;
        }
    }

    function formatDate(startTime, endTime) {
        var formatTime;
        if(startTime < endTime){
            var perDay = 24 * 60 * 60 * 1000; 
            var perHour = 60 * 60 * 1000;
            var perMinute = 60 * 1000;
            var compareTime = endTime - startTime  // 时间差
            var day = Math.floor(compareTime / perDay)
            var hours =Math.floor(compareTime % perDay / perHour)
            var miniutes = Math.floor(compareTime % perDay % perHour / perMinute) 

            if(day < 10){
                day = "0" + day
            }

            if(hours < 10){
                hours = "0" + hours
            }

            if(miniutes < 10){
                miniutes = "0" + miniutes
            }
            
            formatTime = day + ":" + hours + ":" + miniutes
        }else{
            formatTime = "00:00:00"
        }
        
        return formatTime;
    }

    function getDate(timstamp) {
        var date = new Date(timstamp);
        var year = date.getFullYear();  // 获取完整的年份(4位,1970)
        var month = date.getMonth() + 1;  // 获取月份(0-11,0代表1月,用的时候记得加上1)
        var day = date.getDate();  // 获取日(1-31)
        var hour = date.getHours();  // 获取小时数(0-23)
        var minute = date.getMinutes();  // 获取分钟数(0-59)
        var second = date.getSeconds();  // 获取秒数(0-59)
        var forMatDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return forMatDate
    }

    // 多语言
    lang = getQueryVariable("lang")
    var trans = new Translater();
	var imgSrc = "images/pic/"+lang+".png"

	if(lang){
		$(".flagImg").attr("src", imgSrc)
		if(lang == "default"){
			$(".flagImg").attr("src", "images/pic/en.png")
            $(".langAbbr").text("EN")
		}

		if(lang == "en"){
			lang = "default"
		}

		trans.setLang(lang);
	}

	$(".hdREnA").click(function(e) { 
		$('.hdREna').removeClass('on');
		$('.hdREnK').slideUp(100);
		var classes = $(this).attr('class').split(" ").toString(); 
		lang = classes.substr(classes.length - 2);
		imgSrc = "images/pic/"+lang+".png"
		$(".flagImg").attr("src", imgSrc)
		$(".langAbbr").text(lang.toUpperCase())
		if (lang.match(/^[a-z]{2}$/)) { 
			if(lang == "en"){
				lang = "default"
			}
			trans.setLang(lang);
		} 
	});

	var ref = getQueryVariable("ref")
	if(!ref){
		ref = ''
	}
	
	if(!lang){
		lang=''
	}

	$(".menua").eq(0).click(function(e) {
		window.location.href="./index.html?ref="+ref+"&lang="+lang
	})

	$(".IndZhua").click(function(e) {
		window.location.href="./dashboard.html?ref="+ref+"&lang="+lang
	})

    $(".NavA").eq(0).click(function(e) {
        window.location.href="./dashboard.html?ref="+ref+"&lang="+lang
    })

    $(".NavA").eq(1).click(function(e) {
        window.location.href="./myteam.html?ref="+ref+"&lang="+lang
    })

    $(".NavA").eq(2).click(function(e) {
        window.location.href="./depositdet.html?ref="+ref+"&lang="+lang
    })

    $(".dasTckNA").eq(3).click(function(e) {
        window.location.href="https://www.tokengoodies.com/trade"
    })

    $(".hdlogo").on("click", function(){
        window.location.href="./index.html?ref="+ref+"&lang="+lang
    })

});
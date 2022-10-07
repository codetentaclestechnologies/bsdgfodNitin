var refer = "";
var userAddr = "";
var staticReward;
var otherRewards;
var capitalUnfreezed;

var curDay = 0;
var lastDistribute = 0;
var totalUser = 0;
var luckPool = 0;
var starPool = 0;
var topPool = 0;
var userMaxDeposit = 0;
var input;
var inputOk = false;

var perDay = 24*60*60; 
var perHour = 60*60;
var perMinute = 60;

function mobilePcRedirect(referAddr) {
    var mobileLink = "https://m.bsgfod.com?ref="
    var orginLink = window.location.protocol+"//"+window.location.host + getUrlRelativePath() + "?ref=" + refer;
    var sUserAgent= navigator.userAgent.toLowerCase();
    var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp= sUserAgent.match(/midp/i) == "midp";
    var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid= sUserAgent.match(/android/i) == "android";
    var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        window.location.href= mobileLink + referAddr;
    }
};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function getUrlRelativePath(){
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") != -1){
    relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

$(function() {
    function setRefLink() {
        var inviteLink = window.location.protocol+"//"+window.location.host + getUrlRelativePath() + "?ref=" + userAddr;
        $('.refLink').val(inviteLink)
        var myAddrShort = userAddr.substring(0,4) + "..." + userAddr.substring(userAddr.length - 4);
        $(".myAddr").text(myAddrShort);
    }
    
    $(".copyLink").on("click", function(){
        var copyText = document.getElementById('ref-link');
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        layer.msg("Success");
    })

    // 注册
    $(".registerBut").on("click", async function(){
        await bsg.register(refer).send({ feeLimit: 5000e6, callValue: 0 })
        await sleep(1000).then(async function(){
            location.reload()
        })
    })

    setInterval(async() => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            userAddr = window.tronWeb.defaultAddress.base58;
            setRefLink();
            updateSysInfo();
            updateUserInfo();
            updateRewardInfo();
            lotteryCountdown();
            setTimeout(function() {
                setInterval(async() => {
                    if (window.tronWeb.defaultAddress.base58 !== userAddr) {
                        userAddr = window.tronWeb.defaultAddress.base58;
                        setRefLink();
                        updateSysInfo();
                        updateUserInfo();
                        updateRewardInfo();
                        lotteryCountdown();
                    }
                }, 500)
            }, autoRefresh)
        }
    }, autoRefresh);

    $(".inputAmount").on("input", async function(){
        var inputAmount = $(".inputAmount").val();
        input = parseInt(inputAmount);
        if(!input){
            input = 0;
        }
        // 更新存款数量
        $(".depositAmount").text(input);
        var total = parseFloat(input*225/1000) + parseFloat(input);
        // 更新总收益
        $(".total").text(total.toFixed(2));
        if(input % 50 == 0 && input >= 50 && input >= userMaxDeposit){
            if(input <= 2000){
                inputOk = true;
            }else{
                inputOk = false;
            }
        }else{
            inputOk = false;
        }
        if(inputOk){
            $(".depositBut").css({"background":"#3E6FFB"});
        }else{
            $(".depositBut").css({"background":"gray"});
            $(".depositBut").css({"border":"1px solid gray"});
        }
    })

    // 存款
    $(".depositBut").on("click", async function(){
        if(inputOk){
            var amount = tronWeb.toSun(input);
            var isAppr = await isApprove(bsgAddr);
            if(isAppr){
                await bsg.deposit(amount).send({ feeLimit: 5000e6, callValue: 0 });
                await sleep(autoRefresh).then(async function(){
                    location.reload()
                })
            }else{
                setApprove(bsgAddr).then(async function(){
                    await bsg.deposit(amount).send({ feeLimit: 5000e6, callValue: 0 });
                    await sleep(autoRefresh).then(async function(){
                        location.reload()
                    })
                })
            }
        }
    })

    var splitAmt = 0;
    async function updateUserInfo() {
        // 用户TRX余额
        trxBal = parseInt(await tronWeb.trx.getBalance(userAddr))/1000000;
        $(".trxBal").text(trxBal.toFixed(2))
        // 用户USDT余额
        usdtBal = parseInt(await usdt.balanceOf(userAddr).call())/1000000;
        $(".usdtBal").text(usdtBal.toFixed(2))
        var {referrer, start, level, maxDeposit, totalDeposit, totalRevenue} = await bsg.userInfo(userAddr).call();
        // 总收益
        var totalWithdrawn = parseFloat(tronWeb.fromSun(totalRevenue))
        $(".withdrawn").text(totalWithdrawn.toFixed(2))
        refer = tronWeb.address.fromHex(referrer);
        if(refer == zeroAddr){
            $('.TcB').fadeIn(100);
		    $('.Tc-tjr').slideDown(200);
            refer = getQueryVariable("ref");
            if(refer == ''){
                refer = refererDefault;
            }
            $(".Tc-tjrNP").text(refer);
        }

        var referShort = refer.substring(0,4) + "..." + refer.substring(userAddr.length - 4);
        $(".referAddr").text(refer)

        userMaxDeposit = parseInt(maxDeposit)/1000000
        splitAmt = (parseInt(await bsg.getCurSplit(userAddr).call())/1000000)
        $(".freezingAmt").val(splitAmt.toFixed(2))
        totalDeposit = parseInt(totalDeposit);
        if(totalDeposit > 0){
            $(".dMention").css({"display":"none"})
            $(".depositFreezing").css({"background":"gray"})
        }else{
            $(".tMention").css({"display":"none"})
            $(".transferFreezing").css({"background":"gray"})
        }

        level = parseInt(level);
        for(i = 0; i < level; i++){
            $(".level").eq(i).attr("src","images/icon/star02.png");
        }
    }

    // 通过拆分账户存款
    $(".depositFreezing").on("click", async function() {
        var tAmount = $(".tAmount").val();
        if(tAmount >= 50 && tAmount <= 2000 && tAmount % 50 == 0 && tAmount <= splitAmt){
            await bsg.depositBySplit(tronWeb.toSun(tAmount)).send({ feeLimit: 5000e6, callValue: 0 });
        }
    })

    // 通过拆分账户转账
    $(".transferFreezing").on("click", async function() {
        var tAmount = $(".tAmount").val();
        var receiver = $(".receiver").val();
        if(tronWeb.isAddress(receiver)){
            if(tAmount >= 50 && tAmount <= 2000 && tAmount % 50 == 0 && tAmount <= splitAmt){
                await bsg.transferBySplit(receiver, tronWeb.toSun(tAmount)).send({ feeLimit: 5000e6, callValue: 0 });
            }
        }
    })

    $(".withdrawBut").on("click", async function() {
        await bsg.withdraw().send({feeLimit: 5000e6, callValue: 0});
        await sleep(autoRefresh).then(async function(){
            location.reload()
        })
    })

    async function updateRewardInfo() {
        var {capitals, statics, directs, level4Released, level5Left, level5Released, level5Freezed, star, luck, top} = await bsg.rewardInfo(userAddr).call();
        // 解冻存款
        var capital = parseFloat(tronWeb.fromSun(capitals))
        $(".unfreezed").text(capital.toFixed(2));

        //  周期收益
        // var orderLength = parseInt(await bsg.getOrderLength(userAddr).call());
        // var timeNow = (new Date()).getTime() / 1000
        // var totalStatic = parseInt(statics);
        // for(var i = 0; i < orderLength; i++){
        //     var {amount, start, unfreeze, isUnfreezed} = await bsg.orderInfos(userAddr, i).call();
        //     var formatAmt = parseInt(amount);
        //     var formatStart = parseInt(start); 
        //     var formatUnfreeze = parseInt(unfreeze);
        //     if(!isUnfreezed){
        //         if(timeNow > formatUnfreeze){
        //             totalStatic = totalStatic + (formatAmt * 225 / 1000)
        //         }else{
        //             let dayPassed = (timeNow - formatStart) / timeStep;
        //             if(dayPassed > 15){
        //                 totalStatic = totalStatic + (formatAmt * 225 / 1000)
        //             }else{
        //                 totalStatic = totalStatic + (formatAmt * 15  * dayPassed / 1000);
        //             }
        //         }
        //     }
        // }

        var staticWithdrawable = parseFloat(tronWeb.fromSun(statics)) * 0.7
        $(".staticReward").text(staticWithdrawable.toFixed(2))

        // 1层收益
        var directReward = parseFloat(tronWeb.fromSun(directs)) * 0.7
        $(".directReward").text(directReward.toFixed(2))
        // 2-5层收益
        var level4Reward = parseFloat(tronWeb.fromSun(level4Released)) * 0.7
        $(".level4Reward").text(level4Reward.toFixed(2))

        // 6-20层剩余
        var level5Left = parseFloat(tronWeb.fromSun(level5Left)) * 0.7
        $(".level5Left").text(level5Left.toFixed(2))

        // 6-20层冻结
        var level5Freezed = parseFloat(tronWeb.fromSun(level5Freezed)) * 0.7
        $(".level5Freezed").text(level5Freezed.toFixed(2))

        // 6-20层收益
        var level5Reward = parseFloat(tronWeb.fromSun(level5Released)) * 0.7
        $(".level5Reward").text(level5Reward.toFixed(2))

        // 四星奖
        var starReward = parseFloat(tronWeb.fromSun(star)) * 0.7
        $(".starReward").text(starReward.toFixed(2))

        // 幸运奖
        var luckReward = parseFloat(tronWeb.fromSun(luck)) * 0.7
        $(".luckReward").text(luckReward.toFixed(2))

        // Top奖
        var topReward = parseFloat(tronWeb.fromSun(top)) * 0.7
        $(".topReward").text(topReward.toFixed(2))

        // 可取款金额
        var totalReward = capital+staticWithdrawable+directReward+level4Reward+level5Reward+starReward+luckReward+topReward;
        $(".totalReward").text(totalReward.toFixed(2))
    }

    $(".contractAddress").on("click", function(){
        var link = "https://tronscan.io/#/contract/" + bsgAddr +"/code"
        window.location.href = link
    })

    async function lotteryCountdown() {
        // 开奖倒计时
        lastDistribute = parseInt(await bsg.lastDistribute().call())
        setInterval(async() => {
            var nowTime = (new Date).getTime() / 1000;
            var disTime = lastDistribute + perDay;
            var leftTime = disTime - nowTime;
            if(leftTime > 0){
                // 进行中
                var leftHours = Math.floor(leftTime/perHour)
                var hourStart;
                var hourEnd;
                if(leftHours >= 10){
                    hourStart = Math.floor(leftHours/10)
                    hourEnd = Math.floor(leftHours%10)
                }else{
                    hourStart = 0;
                    hourEnd = leftHours;
                }
    
                var leftMinutes = Math.floor(leftTime%perHour/perMinute)
                var minuteStart;
                var minuteEnd;
                if(leftMinutes >= 10){
                    minuteStart = Math.floor(leftMinutes/10)
                    minuteEnd = Math.floor(leftMinutes%10)
                }else{
                    minuteStart = 0;
                    minuteEnd = leftMinutes;
                }
                var leftSeconds = Math.floor(leftTime%perHour%perMinute)
                var secondStart;
                var secondEnd;
                if(leftSeconds >= 10){
                    secondStart = Math.floor(leftSeconds/10);
                    secondEnd = Math.floor(leftSeconds%10);
                }else{
                    secondStart = 0
                    secondEnd = leftSeconds
                }
                $(".hourStart").text(hourStart)
                $(".hourEnd").text(hourEnd)
                $(".minuteStart").text(minuteStart)
                $(".minuteEnd").text(minuteEnd)
                $(".secondStart").text(secondStart)
                $(".secondEnd").text(secondEnd)
            }else {
                //开奖中
                var statusNow = "In Progress"
                if(lang == "cn"){
                    statusNow = "进行中"
                }
                $(".dasJiaR p").text(statusNow)
            }
        }, 1000)
    }

    async function updateSysInfo() {
        // 玩家数量
        totalUser = parseInt(await bsg.totalUser().call());
        $(".totalUser").text(totalUser)
       
        // 幸运之星
        var curDay = parseInt(await bsg.getCurDay().call())
        var dayLuckLength = parseInt(await bsg.getDayLuckLength(curDay).call());
        var checkCount = 10;
        if(dayLuckLength < 10){
            checkCount = dayLuckLength;
        }
        var luckUsers = [];
        var luckDeposits = [];
        for( var i = dayLuckLength; i > dayLuckLength - checkCount; i--){
            var luckUser = await bsg.dayLuckUsers(curDay, i - 1).call();
            luckUsers.push(luckUser)
            var luckDeposit = (parseInt(await bsg.dayLuckUsersDeposit(curDay, i - 1).call())/1000000).toFixed(2);
            luckDeposits.push(luckDeposit);
        }

        for(var i = 0; i < checkCount; i++){
            var luckUser = tronWeb.address.fromHex(luckUsers[i]);
            $(".luckUser").eq(i).text(luckUser)
            $(".luckDeposit").eq(i).text(luckDeposits[i])
        }

        // Top榜
        for(var i = 0; i < 3; i++){
            var dayTopUser = tronWeb.address.fromHex(await bsg.dayTopUsers(curDay, i).call());
            if(dayTopUser != zeroAddr) {
                $(".dayTopUser").eq(i).text(dayTopUser);
            }else{
                break;
            }
        }
    }

    async function isApprove(to) {
        let res = await usdt.allowance(userAddr, to).call();
        var allowanceAmount = parseFloat(res);
        if(allowanceAmount > 5000e6) {
            return true;
        }else{
            return false;
        }
    }

    async function setApprove(to) {
        var amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        await usdt.approve(to, amount).send({ feeLimit: 5000e6, callValue: 0 });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

});
var userAddr = "";
var updated = false;

$(function() {
    setInterval(async() => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            userAddr = window.tronWeb.defaultAddress.base58;
            if(!updated){
                updateTeamInfos(0, 20);
            }
            setTimeout(function() {
                setInterval(async() => {
                    if (window.tronWeb.defaultAddress.base58 !== userAddr) {
                        userAddr = window.tronWeb.defaultAddress.base58;
                        updateTeamInfos(0, 20);
                    }
                }, 500)
            }, autoRefresh)
        }
    }, autoRefresh);

    async function updateTeamInfos(from, to) {
        updated = true;
        var teamDeposit = await bsg.getTeamDeposit(userAddr).call()
        var maxDirectDeposit = parseInt(teamDeposit[0])/1000000;
        var otherDirectDeposit = parseInt(teamDeposit[1])/1000000;
        var teamTotalDeposit = parseInt(teamDeposit[2])/1000000;
        $(".maxDirectDeposit").text(maxDirectDeposit.toFixed(2))
        $(".otherDirectDeposit").text(otherDirectDeposit.toFixed(2))
        $(".totalTeamDeposit").text(teamTotalDeposit.toFixed(2))

        // total invit
        var {teamNum} = await bsg.userInfo(userAddr).call();
        $(".totalInvited").text(teamNum)

        var totalInvited = 0;
        var totalActive = 0;
        var teamEachDeposit = new Array(20).fill(0);
        for(var i = from; i < to; i++){
            var inviteAmount =parseInt(await bsg.getTeamUsersLength(userAddr, i).call());
            if(inviteAmount > 0){
                for(var j = 0; j < inviteAmount; j++){
                    var inviteUserAddr = tronWeb.address.fromHex(await bsg.teamUsers(userAddr, i, j).call());
                    var {start, level, totalDeposit, teamTotalDeposit} = await bsg.userInfo(inviteUserAddr).call();
                    var depositHtml = "<tr>"
    
                    // 钱包地址
                    var iAddr = inviteUserAddr;
                    var iAddrShort = inviteUserAddr.substring(0, 4) +"..."+ inviteUserAddr.substring(inviteUserAddr.length-4);
                    depositHtml = depositHtml + "<td><span class='DepC7'>" + iAddrShort + "</span></td>"
    
                    // 等级
                    var iLevel = "L" + level;
                    depositHtml = depositHtml + "<td><span class='DepC3'>" + iLevel + "</span></td>"
                    // 层级
                    var layer = i + 1
                    depositHtml = depositHtml + "<td><span class='DepC3'>" + layer + "</span></td>"
    
                    // 状态
                    var iStatus = "UnActive";
                    if(lang == "cn"){
                        iStatus = "未激活"
                    }
                    var iTotalDeposit = parseInt(totalDeposit)
                    if(iTotalDeposit > 0){
                        if(lang == "cn"){
                            iStatus = "已激活"
                        }else{
                            iStatus = "Actived"
                        }
                        totalActive = totalActive + 1
                    }

                    depositHtml = depositHtml + "<td><span class='DepC2'>" + iStatus + "</span></td>"
    
                    // 时间
                    var iStartTime = parseInt(start) * 1000
                    var iTime = getDate(iStartTime);
                    depositHtml = depositHtml + "<td><span class='DepC4'>" + iTime + "</span></td>"
                    depositHtml = depositHtml + "</tr>"
                    $(".DepTab").append(depositHtml)

                    // 更新总信息
                    totalInvited = totalInvited + 1;
                    var totalUnActived = totalInvited - totalActive;
                    // 
                    var forMatTotalDeposit = parseInt(totalDeposit)/1000000
                    teamEachDeposit[i] = teamEachDeposit[i] + forMatTotalDeposit
                }
            }else{
                break;
            }
        }

        $(".totalActive").text(totalActive)
        $(".totalUnActived").text(totalUnActived)

        var sevenToTen = 0;
        for(var i = 6; i < 10; i++){
            sevenToTen = sevenToTen + teamEachDeposit[i]
        }

        var elToTw = 0;
        for(var i = 10; i < 20; i++){
            elToTw = elToTw + teamEachDeposit[i]
        }

        for(var i = 0; i < 6; i++){
            $(".teamDeposit").eq(i).text(teamEachDeposit[i].toFixed(2));
            if(teamEachDeposit[i] > 0){
                var rate = parseFloat(teamEachDeposit[i] * 100 /teamTotalDeposit).toFixed(2);
                $(".rate").eq(i).text(rate);
            }
        }

        if(sevenToTen > 0){
            $(".teamDeposit").eq(6).text(sevenToTen);
            var rate = parseFloat(sevenToTen * 100 /teamTotalDeposit).toFixed(2);
            $(".rate").eq(6).text(rate);
        }

        if(elToTw > 0){
            $(".teamDeposit").eq(7).text(elToTw);
            var rate = parseFloat(elToTw * 100 /teamTotalDeposit).toFixed(2);
            $(".rate").eq(7).text(rate);
        }
        var inviteLevel = "Level";
        if(lang == "cn"){
            inviteLevel = "层"
        }
        var pillar4 = echarts.init(document.getElementById('pillar4'));
        pillar4.setOption({
            color:["#3E6FFB","#FA699D","#20C9AC","#00A5FF", "#956DE9", "#FFBD63", "#63F08A", "#FB6320"],
            title : {
                text: '',y:'5px',x:'20px',textStyle: {fontSize: 12,color: '#FFF',}
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show : false,
                itemWidth:8,
                itemHeight:8,
                itemGap:8,
                orient:'vertical',
                x : '0',
                top:8,
                data:['1' + inviteLevel,'2' + inviteLevel,'3' + inviteLevel,'4' + inviteLevel, '5' + inviteLevel, '6' + inviteLevel, '7~10' + inviteLevel, '11~20' + inviteLevel],
                textStyle:{fontSize:12,color:'#FFF',}
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie', 'funnel'],
                        option: {funnel: {x: '25%',width: '50%',funnelAlign: 'left',max:400}}
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true, 
            series : [
                {
                    name:inviteLevel,
                    type:'pie',
                    top:'10px',
                    radius : ['65%', '70%'],
                    center:["50%" ,"50%"],
                    itemStyle : {
                        normal : {
                            label : {show : true},
                            labelLine : {show :true}
                        },
                        emphasis : {
                            label : {
                                show : false,
                                position : 'center',
                                textStyle : {fontSize :'12',}
                            }
                        }
                    },
                    itemStyle:{normal:{labelLine:{length:0},}},
                    label: {normal: {textStyle: {fontSize: 0,color: '#FFF'},}},
                    data:[
                        {value:teamEachDeposit[0], name:'1' + inviteLevel},
                        {value:teamEachDeposit[1], name:'2' + inviteLevel},
                        {value:teamEachDeposit[2], name:'3' + inviteLevel},
                        {value:teamEachDeposit[3], name:'4' + inviteLevel},
                        {value:teamEachDeposit[4], name:'5' + inviteLevel},
                        {value:teamEachDeposit[5], name:'6' + inviteLevel},
                        {value:sevenToTen, name:'7~10' + inviteLevel},
                        {value:elToTw, name:'11~20' + inviteLevel},
                    ]
                }
            ]
        }) ;
        window.addEventListener("resize", function () {
            pillar4.resize();
        });

    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
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

});
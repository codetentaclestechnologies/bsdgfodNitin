var userAddr = "";
var updated = false;
$(function() {
    setInterval(async() => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            userAddr = window.tronWeb.defaultAddress.base58;
            if(!updated){
                updateOrders()
            }
            setTimeout(function() {
                setInterval(async() => {
                    if (window.tronWeb.defaultAddress.base58 !== userAddr) {
                        userAddr = window.tronWeb.defaultAddress.base58;
                    }
                }, 500)
            }, autoRefresh)
        }
    }, autoRefresh);

    async function updateOrders() {
        updated = true
        var length = parseInt(await bsg.getOrderLength(userAddr).call())
        for(i = length - 1; i >= 0; i--){
            var {amount, start, unfreeze, isUnfreezed} = await bsg.orderInfos(userAddr, i).call();
            var depositHtml = "<tr>"
            var startTS = parseInt(start)*1000;

            // 存款金额
            var dAmt = tronWeb.fromSun(amount);
            depositHtml = depositHtml + "<td><span class='DepC2 DepCZ1'>$" + dAmt + "</span></td>"

            // 存款日期
            var startDate = getDate(startTS);
            depositHtml = depositHtml + "<td><span class='DepC3'>" + startDate + "</span></td>"

            // 解冻日期
            var unfreezeTS = parseInt(unfreeze)*1000;
            var unfreezeDate = getDate(unfreezeTS);
            depositHtml = depositHtml + "<td><span class='DepC4'>" + unfreezeDate + "</span></td>"

            // 周期收益
            var income = tronWeb.fromSun(parseInt(amount) * 225 / 1000);
            depositHtml = depositHtml + "<td><span class='DepC4 DepCZ2'>$" + income + "</span></td>"

            // 订单状态
            var date = new Date();
            var timeNow = date.getTime()
            var status = '';
            var className = '';
            if(timeNow < unfreezeTS){
                if(lang == "cn"){
                    status = "未解冻"
                }else{
                    status = "Freezing"
                }
                className = 'DepC1'
            }else{
                if(isUnfreezed){
                    if(lang == "cn"){
                        status = "已完成"
                    }else{
                        status = "Completed"
                    }
                    className = 'DepC6'

                }else{
                    if(lang == "cn"){
                        status = "待关联"
                    }else{
                        status = "Unbonded"
                    }
                    className = 'DepC3'
                }
            }
            depositHtml = depositHtml + "<td><span class='" + className + "'>" + status + "</span></td>"
            depositHtml = depositHtml + "</tr>"
            $(".DepTab").append(depositHtml)
        }

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
(function (window, document, $, undefined) {
    'use strict';
    const REACT_APP_API_URL="https://seal-app-wwrpt.ondigitalocean.app/api/v1";
    //const REACT_APP_API_URL="http://localhost:8080/api/v1";

    $(document).ready(function(){
        $.get(`${REACT_APP_API_URL}/country/ddl/`).then(resp=>{
            console.log("resp", resp);
            if(resp.responseCode==200){
                var $countryId=$("#countryId");
                
                resp.data.map(item=>{
                    $countryId.append(`<option value="${item.id}">${item.title}</option>`);
                });  
            }
        });

        $.get(`${REACT_APP_API_URL}/ticket_size/ddl/`).then(resp=>{
            console.log("resp", resp);
            if(resp.responseCode==200){
                var $tickets=$("#tickets");
                
                resp.data.map(item=>{
                    $tickets.append(`<div class="custom-control custom-radio custom-control">
                                        <input type="radio" name="minimumTicketSizeId" id="ticketSize_${item.id}" class="custom-control-input" value="${item.id}">
                                        <label class="custom-control-label red" for="ticketSize_${item.id}">${item.title}</label>
                                    </div>`);
                });  
            }
        });

        $.get(`${REACT_APP_API_URL}/fund_required/ddl/`).then(resp=>{
            console.log("resp", resp);
            if(resp.responseCode==200){
                var $fundRaiseRequiredId=$("#fundRaiseRequiredId");
                
                resp.data.map(item=>{
                    $fundRaiseRequiredId.append(`<option value="${item.id}">${item.title}</option>`);
                });  
            }
        });

        $.get(`${REACT_APP_API_URL}/industry/ddl/`).then(resp=>{
            console.log("resp", resp);
            if(resp.responseCode==200){
                var $industry_ul=$("#industry-ul");
                 
                resp.data.map(item=>{
                    $industry_ul.append(`<li>
                                            <label>
                                                <input name="industryIds" type="checkbox" value="${item.id}"/>
                                                <span>${item.title}</span>
                                            </label>
                                        </li>`);
                });  
            }
        });
    })
    $("#onSubmitInvestor").click(function(){
        if($("#iAgree").is(":checked")){
            var $frmMain=$("#frmMain");
            var data = $frmMain.serializeObject();
            console.log(data);
            $.post(`${REACT_APP_API_URL}/investor/createProfile_step1`, data).done(resp=>{
                console.log("createProfile_step1 resp", resp);
                if(resp.responseCode==200){
                    window.location.replace("messageRaiseFundForm.html");
                }
                else{
                    alert(resp.responseMessage??"Oops!. somthing went wrond. plz try after some time.")
                }
            }).fail((err)=> alert("input value is not valid"));
        }
    })
    $("#onSubmitFounder").click(function(){
        if($("#iAgree").is(":checked")){
            var $frmMain=$("#frmMain");
            var data = $frmMain.serializeObject();
            console.log(data);
            $.post(`${REACT_APP_API_URL}/founder/createProfile_step1`, data).done(resp=>{
                console.log("createProfile_step1 resp", resp);
                if(resp.responseCode==200){
                    window.location.replace("messageRaiseFundForm.html");
                }
                else{
                    alert(resp.responseMessage??"Oops!. somthing went wrond. plz try after some time.")
                }
            }).fail((err)=> alert("input value is not valid"));
        }
    })
  
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    
})(window, document, jQuery)
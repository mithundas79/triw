function etrap(quest,etype) {
   jq("label#"+quest+"_error").show();
   jq("input#"+quest+":first").focus();  
   jq("#"+quest+"_label").addClass('dotted');
   jq('html,body').animate({scrollTop: jq("#"+quest+"_label").offset().top-100},500);
   return false;
}

function validateEmail(address) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(reg.test(address) == false) {
      return false;
   }
   return true;
}


jq(function() {
   jq('#form-contact').unbind('submit');
   jq("input#quest0").focus();
   jq('.error').hide();

   /* Toggle Radio and Textbox on Question 10 */
   jq('.quest10').click(function() {
      jq('input#quest10b').val('');
   });
   jq('input#quest10b').keypress(function() {
      jq('.quest10:checked').prop('checked',false);
   });

   jq('.button').click(function() {
      //validation process
      jq('.error').hide();
      jq('label').removeClass('dotted'); 

      var quest0 = jq("input#quest0").val();  
      if (quest0 == "") { return etrap("quest0"); }  

      var quest1 = jq("input[name='quest1']:checked").val();
      if (quest1 === undefined) { return etrap("quest1"); }  

      var quest2 = jq("input[name='quest2']:checked").val();
      if (quest2 === undefined) { return etrap("quest2"); }  

      var quest3 = jq("input[name='quest3']:checked").val();
      if (quest3 === undefined) { return etrap("quest3"); }  

      var quest4 = jq("input[name='quest4']:checked").val();
      if (quest4 === undefined) { return etrap("quest4"); }  

      var quest5 = jq("input[name='quest5']:checked").val();
      if (quest5 === undefined) { return etrap("quest5"); }  

      var quest6 = jq("input[name='quest6']:checked").val();
      if (quest6 === undefined) { return etrap("quest6"); }  

      var quest7 = jq("input[name='quest7']:checked").val();
      if (quest7 === undefined) { return etrap("quest7"); }  

      var quest8 = jq("input[name='quest8']:checked").val();
      if (quest8 === undefined) { return etrap("quest8"); }  

      var quest9 = jq("input[name='quest9']:checked").val();
      if (quest9 === undefined) { return etrap("quest9"); }  

      var quest10 = jq("input[name='quest10']:checked").val();
      var quest10b = jq("input#quest10b").val();  
      if (quest10 === undefined && quest10b == "") { return etrap("quest10"); }       
      if (quest10b.length>0) { quest10 = quest10b; }

      var quest11 = jq("input[name='quest11']:checked").val();
      if (quest11 === undefined) { return etrap("quest11"); }  

      var quest11b = jq("input#quest11b").val();
      if (quest11 == "YES" && quest11b == "") { 
         jq('#quest11b_error').html('This field is required.');
         return etrap("quest11b"); 
      }
      if (quest11b.length>0) {
         if ( !(validateEmail(quest11b)) ) {
            jq('#quest11b_error').html('Please enter a valid email address.');
            return etrap("quest11b");
         }
      }

      var quest12 = jq("input#quest12").val();
      var quest13 = jq("input#quest13").val(); 

      jq('#submit_btn').attr("disabled","true");
      jq('#submit_ajax').html("Sending Form..");;

      jq.ajax({  
         type: "POST",  
         url: "/ajax_calls.php",  
         data: {
            form: 'sellers',
            quest0: quest0,
            quest1: quest1,
            quest2: quest2,
            quest3: quest3,
            quest4: quest4,
            quest5: quest5,
            quest6: quest6,
            quest7: quest7,
            quest8: quest8,
            quest9: quest9,
            quest10: quest10,
            quest11: quest11,
            quest11b: quest11b,
            quest12: quest12,
            quest13: quest13
         }, 
         success: function(data) {  
            jq('#submit_ajax').html("Sending Form..");
            jq('#contact_form').html("<div id='completed-message'>Thank you. The form has been submitted</div>");  
            jq('html,body').animate({scrollTop: jq("#rightcol").offset().top-100},500);
         }  
      });  
      return false;
   });

});

Game.LoginWith2faPage = (() => {
    let configMap = {
        page: 'LoginWith2fa',
    };

    let stateMap = {
        currentPage: '',
        isLocated: false,

        pincode: [],
    };

    const privateInit = (page) => {
        stateMap.currentPage = page;
        stateMap.isLocated = configMap.page === page;

        if (!stateMap.isLocated)
            return;

        maskInputFields();
    };

    const maskInputFields = () => {
        console.log('maskinput')
        let debug = false;
        let pincode1 = document.getElementsByName('Input.Pincode1');

        let form = $('#twofa__login__form');

        let group = form.find('#twofa__login__form__pincode');

        let inputs = group.find('input');

        let first = form.find('[name="Input.Pincode1"]');
        let second = form.find('[name="Input.Pincode2"]');
        let third = form.find('[name="Input.Pincode3"]');
        let fourth = form.find('[name="Input.Pincode4"]');
        let fifth = form.find('[name="Input.Pincode5"]');
        let sixth = form.find('[name="Input.Pincode6"]');

        inputs.on('keyup', (event) => {
            let code = event.keyCode || event.which;

            if (code === 9 && ! event.shiftKey) {
                event.preventDefault();

                $('#twofa__login').focus();
            }
        })
        .inputmask({
            mask: '9',
            placeholder: '',
            showMaskOnHover: false,
            showMaskOnFocus: false,
            clearIncomplete: true,
            onincomplete: function() {
              ! debug || console.log('inputmask incomplete');
            },
            oncleared: function() {
                let index = inputs.index(this)
                  , prev = index - 1
                  , next = index + 1;
                
                if (prev >= 0) {
                  // clear field
                  inputs.eq(prev).val('');
                  
                  // focus field
                  inputs.eq(prev).focus();
                  
                  // remove last nubmer
                  stateMap.pincode.splice(-1, 1)
                } else {
                  return false;
                }
                
                ! debug || console.log('[oncleared]', prev, index, next);
            },
            onKeyValidation: function(key, result) {
                var index = inputs.index(this)
                  , prev = index - 1
                  , next = index + 1;
                
                // focus to next field
                if (prev < 6) {
                    inputs.eq(next).focus();
                }
        
                ! debug || console.log('[onKeyValidation]', index, key, result, _pincode);
            },
            onBeforePaste: function (data, opts) {
                $.each(data.split(''), function(index, value) {
                  // set value
                  inputs.eq(index).val(value);
                  
                  ! debug || console.log('[onBeforePaste:each]', index, value);
                });
        
                return false;
            }
        });
            
        $('[name="Input.Pincode1"]')
        .on('focus', function(event) {
        //   ! debug || console.log('[1:focus]', _pincode);
        })
        .inputmask({
            oncomplete: function() {
            // add first character
            stateMap.pincode.push($(this).val());
            
            // focus to second field
            $('[name="Input.Pincode2"]').focus();
            
            // ! debug || console.log('[1:oncomplete]', _pincode);
            }
        });

        $('[name="Input.Pincode2"]').on('focus', function(event) {
            if ( ! (first.val().trim() !== '')) {
                // prevent default
                event.preventDefault();
                
                // reset pincode
                stateMap.pincode = [];
                
                // handle each field
                inputs.each(function() {
                    // clear each field
                    $(this).val('');
                });
                
                // focus to first field
                first.focus();
            }
            
            ! debug || console.log('[2:focus]', _pincode);
        })
        .inputmask({
            oncomplete: function() {
                // add second character
                stateMap.pincode.push($(this).val());
                
                // focus to third field
                $('[name="Input.Pincode3"]').focus();
                
                ! debug || console.log('[2:oncomplete]', _pincode);
            }
        });  

        $('[name="Input.Pincode3"]').on('focus', function(event) {
            if ( ! (first.val().trim() !== '' &&
                second.val().trim() !== '')) {
                // prevent default
                event.preventDefault();
                
                // reset pincode
                stateMap.pincode = [];
                
                // handle each field
                inputs.each(function() {
                    // clear each field
                    $(this).val('');
                });
                
                // focus to first field
                first.focus();
            }
            
            ! debug || console.log('[3:focus]', _pincode);
        })
        .inputmask({
            oncomplete: function() {
                // add third character
                stateMap.pincode.push($(this).val());
                
                // focus to fourth field
                $('[name="Input.Pincode4"]').focus();
                
                ! debug || console.log('[3:oncomplete]', _pincode);
            }
        });
        
        $('[name="Input.Pincode4"]').on('focus', function(event) {
            if ( ! (first.val().trim() !== '' &&
                second.val().trim() !== '' &&
                third.val().trim() !== '')) {
                // prevent default
                event.preventDefault();
                
                // reset pincode
                stateMap.pincode = [];
                
                // handle each field
                inputs.each(function() {
                    // clear each field
                    $(this).val('');
                });
                
                // focus to first field
                first.focus();
            }
        
            ! debug || console.log('[4:focus]', _pincode);
        })
        .inputmask({
            oncomplete: function() {
                // add fo fourth character
                stateMap.pincode.push($(this).val());
                
                // focus to fifth field
                $('[name="Input.Pincode5"]').focus();
                
                ! debug || console.log('[4:oncomplete]', _pincode);
            }
        });

        $('[name="Input.Pincode5"]').on('focus', function(event) {
            if ( ! (first.val().trim() !== '' &&
                second.val().trim() !== '' &&
                third.val().trim() !== '' &&
                fourth.val().trim() !== '')) {
                // prevent default
                event.preventDefault();
                
                // reset pincode
                stateMap.pincode = [];
                
                // handle each field
                inputs.each(function() {
                    // clear each field
                    $(this).val('');
                });
                
                // focus to first field
                first.focus();
            }
        
        ! debug || console.log('[5:focus]', stateMap.pincode);
        })
        .inputmask({
            oncomplete: function() {
                // add fifth character
                stateMap.pincode.push($(this).val());
                
                // focus to sixth field
                $('[name="Input.Pincode6"]').focus();
                
                ! debug || console.log('[5:oncomplete]', stateMap.pincode);
            }
        });

        $('[name="Input.Pincode6"]').on('focus', function(event) {
            if ( ! (first.val().trim() !== '' &&
                second.val().trim() !== '' &&
                third.val().trim() !== '' &&
                fourth.val().trim() !== '' &&
                fifth.val().trim() !== '')) {
                // prevent default
                event.preventDefault();
                
                // reset pincode
                stateMap.pincode = [];
                
                // handle each field
                inputs.each(function() {
                    // clear each field
                    $(this).val('');
                });
                
                // focus to first field
                first.focus();
            }
        
            ! debug || console.log('[6:focus]', stateMap.pincode);
        })
        .inputmask({
          oncomplete: function() {
            // add sixth character
            stateMap.pincode.push($(this).val());
            
            // pin length not equal to six characters
            if (stateMap.pincode.length !== 6) {
                // reset pin
                stateMap.pincode = [];
                
                // handle each field
                inputs.each(function() {
                    // clear each field
                    $(this).val('');
                });
                
                // focus to first field
                $('[name="Input.Pincode1"]').focus();
            } else {
              // handle each field
              inputs.each(function() {
                // disable field
                $(this).prop('disabled', true);
              });
              
              // send request
            //   _req = $.ajax({
            //     type: 'POST',
            //     url: '/api/tfa',
            //     data: {
            //       'code': _pincode.join(''),
            //       '_csrf': ''
            //     }
            //   })
            //   .done(function(data, textStatus, jqXHR) {
            //     try {
            //       ! debug || console.log('data', data);
                  
            //       if (data.ok === true) {
            //         $group.addClass('form__group--success');
            //         $button.removeAttr('disabled');
            //       }
                  
            //       if (data.ok === false) {
            //         $group.addClass('form__group--error');
            //       }
            //     } catch (err) {
                  
            //     }
            //   })
            //   .fail(function(jqXHR, textStatus, errorThrown) {
            //     $group.removeClass('form__group--error');
            //   })
            //   .always(function(dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
            //     // reset pin
            //     stateMap.pincode = [];
                
            //     // reset request
            //     _req = null;
    
            //     setTimeout(function() {
            //       // handle each field
            //       $inputs.each(function() {
            //         // clear all fields
            //         $(this).val('');
    
            //         // enable all fields
            //         $(this).prop('disabled', false);
            //       });
    
            //       // remove response status class
            //       $group.removeClass('form__group--success form__group--error');
                  
            //       // disable submit button
            //       $button.attr('disabled', true);
                  
            //       // focus to first field
            //       $first.focus();
            //     }, 2000);
            //   });
            }
    
            ! debug || console.log('[6:oncomplete]', _pincode);
          }
        });

        pincode1.onfocus = (event) => {

        };
        console.log(pincode1);
    };



    return {
        init: privateInit,
    };
})();
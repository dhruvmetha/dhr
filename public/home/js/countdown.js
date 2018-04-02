

    CountDownTimer('04/13/2018 10:1 AM', 'countdown');
    CountDownTimer('04/16/2018 10:1 AM', 'newcountdown');

    function CountDownTimer(dt, id)
    {
        var end = new Date(dt);

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        function showRemaining() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {

                clearInterval(timer);
                document.getElementById(id).innerHTML = 'Machi Rediyaaa';

                return;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            document.getElementById(id).innerHTML = '<span class = "time">&nbsp;'+ days + '&nbsp;D&nbsp;</span>&nbsp;&nbsp;';
            document.getElementById(id).innerHTML += '<span class = "time">&nbsp;'+hours +'&nbsp;H&nbsp;</span>&nbsp;&nbsp;';
            document.getElementById(id).innerHTML += '<span class = "time">&nbsp;'+minutes +'&nbsp;M&nbsp;</span>&nbsp;&nbsp;' ;
            document.getElementById(id).innerHTML += '<span class = "time">&nbsp;'+ seconds +'&nbsp;S&nbsp;&nbsp;</span>&nbsp;';
        }

        timer = setInterval(showRemaining, 1000);
    }

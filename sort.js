function MergeSort() {
    this.array = [];

    this.on = function(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = [];
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
        console.log(this._eventHandlers);
    };

    this.off = function(eventName, handler) {
        var handlers = this._eventHandlers[eventName];
        if (!handlers) return;
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] == handler) {
                handlers.splice(i--, 1);
            }
        }
    };

    this._eventHandlers = [];

    this.trigger = function(eventName) {
        if (!this._eventHandlers[eventName]) {
            return;
        }
        var handlers = this._eventHandlers[eventName];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, [].slice.call(arguments, 1));
        }
    };

    this.getArray = function(length) {
        console.log('length', length);
        var array = [];
        for (var i = 0; i < length; i++) {
            array[i] = new Array(1);
            array[i][0] = Math.floor(Math.random() * 100);
        }
        return array;
    };

    function Break(Arr) {
        var newArr = [];
        var lj = Arr.length;
        for (var j = 0; j < lj; j += 2) {
            if (j === lj - 1) newArr[j / 2] = [Arr[j]];
            else
            if (Arr[j] > Arr[j + 1]) newArr[j / 2] = [Arr[j + 1], Arr[j]];
            else newArr[j / 2] = [Arr[j], Arr[j + 1]];
        }
        return newArr;
    }

    this.Merge = function(Arr) {
        console.log(Arr);
        var newArr = [];
        var lj = Arr.length;
        var l = 0;
        for (var j = 0; j < lj; j += 2) {
            this.trigger('show', [j, j + 1]);
            newArr[l] = [];
            if (j + 1 == lj) {
                newArr[l] = Arr[j];
                this.trigger('end', j + 1);
            } else {
                while (Arr[j].length && Arr[j + 1].length)
                    if (Arr[j][0] < Arr[j + 1][0]) {
                        newArr[l].push(Arr[j].shift());
                        this.trigger('first', j);
                    } else {
                        newArr[l].push(Arr[j + 1].shift());
                        this.trigger('second', j);
                    }
                if (!Arr[j].length && Arr[j + 1].length) {
                    newArr[l] = newArr[l].concat(Arr[j + 1]);
                    Arr[j + 1] = [];
                    this.trigger('end', j + 1);
                } else if (!Arr[j + 1].length && Arr[j].length) {
                    this.trigger('end', j);
                    newArr[l] = newArr[l].concat(Arr[j]);
                    Arr[j] = [];
                }
                l++;
            }
        }
        this.trigger('end_merge', newArr);
        return (newArr);
    };
    this.show_string = function(count, Arr) {
        var d = document.createElement('div');
        d.className = 'step';
        d.id = 'step_' + count;
        var j, space;
        for (i = 0; i < Arr.length; i++) {
            space = '';

            for (j = 0; j < Arr[i].length; j++) {
                d.innerHTML += '<div class = "number">' + Arr[i][j] + '</div>';
                space += '<div class = "space">&nbsp</div>';
            }
            d.innerHTML += space;
        }
        d.innerHTML += '<br>';
        document.getElementById('inf').appendChild(d);
    };
}

function Start() {
    var mergesort = new MergeSort();
    mergesort.on('first', function(data) {
        console.log('first', data, count_step);
    });
    mergesort.on('second', function(data) {
        console.log('second', data, count_step);
    });
    mergesort.on('end', function(data) {
        console.log('end', data, count_step);
    });
    mergesort.on('show', function(data) {
        console.log('show', data, count_step);
    });
    var count_step = 0;
    mergesort.on('end_merge', function(array) {
        var data = array.length;
        console.log('end_merge', count_step, array.length);
        count_step++;
        mergesort.show_string(count, array);
        if (data > 1 && count_step < 10) {
            array = mergesort.Merge(array);
        }
    });

    document.getElementById('inf').innerHTML = '';
    array = mergesort.getArray(Math.floor(Math.random() * 15) + 1);
    mergesort.show_string(0, array);
    var count = 1;
    array = mergesort.Merge(array);
}
function MergeSort() {
    this.array = [];
    this.saw = []; //просмотренные массивы
    this.count_saw = 0; //количество просмотернных элементов
    var temp_array = [];
    var use = [];
    var length_array = 0;
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
        length_array = length;
        for (var i = 0; i < length; i++) {
            this.array[i] = new Array(1);
            this.array[i][0] = Math.floor(Math.random() * 100);
            //temp_array[i] = this.array[i][0];
        }
        return this.array;
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

    function isPositive(number) {
        return number >= 0;
    }

    function isNegative(number) {
        return number < 0;
    }

    function GetNumber(arr) {
        //var arr = this.array;
        //console.log(arr);
        var i = 0;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].some(isPositive)) {
                //      console.log(i);
                break;
            }
        }
        //console.log(i);
        if (i == arr.length) return -1;
        if (i % 2) i--;
        return i;
    }
    var new_array = [];

    this.Swap = function() {
        var arr = this.array;
        //console.log(arr);
        if (arr.length === 1) {
            this.trigger('sort_end', arr);
            return;
        }
        var index = GetNumber(arr); //гарантированно есть либо в нем, либо в соседнем неотрицательный элемент
        console.log('index', index, length_array);
        if (index < 0) {

            new_array[index / 2] = arr[length_array - 1].slice();
            this.array = new_array.slice();
            length_array = new_array.length;
            new_array = [];
            this.trigger('end_step', this.array);
            return;
        }
        if (index === length_array - 1) {
            console.log('length');
            new_array[index / 2] = [];
            for (var i = 0; i < arr[index].length; i++)
                if (arr[index][i] >= 0) {
                    //console.log(1);
                    new_array[index / 2].push(arr[index][i]);
                    arr[index][i] = -1;
                }
                //console.log(new_array, arr[index]);
            this.trigger('end_array', index + 1);
            return;
        }
        if (arr[index].every(isNegative)) {
            console.log(arr[index+1].length);
            for (var i = 0; i < arr[index + 1].length; i++) {
                console.log(arr[index][i]);
                if (arr[index + 1][i] >= 0) {
                    new_array[index / 2].push(arr[index + 1][i]);
                    arr[index + 1][i] = -1;
                }
            }
            //console.log(new_array);
            this.trigger('end_array', index);
            return;
        }
        if (arr[index + 1].every(isNegative)) {
            console.log(arr[index].length);
            // console.log(arr[index].length);
            for (var i = 0; i < arr[index].length; i++) {
                console.log(arr[index][i]);
                if (arr[index][i] >= 0) {
                    // console.log(1);
                    new_array[index / 2].push(arr[index][i]);
                    arr[index][i] = -1;
                }
            }
            //console.log(new_array, arr[index]);
            this.trigger('end_array', index + 1);
            return;
        }
        var ind1 = 0;
        var ind2 = 0;
        // console.log('new',new_array, index, ind1, ind2);
        if (new_array.length <= (index / 2)) new_array[index / 2] = [];
        while (arr[index][ind1] < 0 && ind1 < arr[index].length) ind1++;
        while (arr[index + 1][ind2] < 0 && ind1 < arr[index + 1].length) ind2++;
        //if (!new_array.hawOwnProperty(index/2)) new_array[index/2] = [];
        if (arr[index][ind1] < arr[index + 1][ind2]) {
            new_array[index / 2].push(arr[index][ind1]);
            arr[index][ind1] = -1;
            // console.log(new_array);
            this.trigger('change', index);
            return;
        } else {
            //if (!new_array.hawOwnProperty(index/2)) new_array[index/2] = [];
            new_array[index / 2].push(arr[index + 1][ind2]);
            arr[index + 1][ind2] = -1;
            //console.log(new_array);
            this.trigger('change', index + 1);
            return;
        }
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

function Start_old() {
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
        mergesort.show_string(count_step, array);
        if (data > 1 && count_step < 10) {
            array = mergesort.Merge(array);
        }
    });

    document.getElementById('inf').innerHTML = '';
    array = mergesort.getArray(4);
    mergesort.show_string(0, array);
    var count = 1;
    array = mergesort.Merge(array);
}
function Start() {
var mergesort = new MergeSort();
array = mergesort.getArray(5);
mergesort.on("change", function(data) {
    console.log("change", data, mergesort.array);
});
mergesort.on("end_array", function(data) {
    console.log("end_array", data);
});
mergesort.on("end_step", function(data) {
    console.log("end_step", data);
});
mergesort.on("sort_end", function(data) {
    console.log("sort_end", data);
});
}
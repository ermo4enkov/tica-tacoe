window.onload(function (){
    const CIRCLE = 'CIRCLE';
    const CROSS = 'CROSS';
    let last = '';
    let fields = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];

    function addValueToMatrix(value, sign){
        let res;
        let slot;
        if (value <= 2){
            res = 0
            slot = value
        } else if(value >= 3 && value <= 5){
            res = 1
            slot = value - 3
        } else {
            res = 2
            slot = value - 6
        }

        return fields[res][slot] = sign
    }

    function checkHorizontalFields(id){
        const row = id[id.length-1]
        return fields[row].every((item, index, arr) => item === arr[0])
    }

    function checkVerticalFields(){
        const [first, second, third] = fields;
        for (let count = 0; count < 3; ++count){
            if(first[count] === second[count] && first[count] === third[count]){
                return true;
            }
        }
        return false;
    }

    function checkSideFields(){
        const [first, second, third] = fields;
        return first[0] === second[1] && first[0] === third[2] || first[2] === second[1] && first[2] === third[0]
    }


    const elems = document.querySelectorAll('td.field');
    const nextNode = document.getElementById("next");

    elems.forEach(element => {
        element.addEventListener("click", (e)=> {
            if (last === CIRCLE || last === ''){
                element.innerHTML = "<img src='assets/cross.svg' alt='' width='90px' />"
                last = CROSS
                nextNode.innerText = "Next turn is: CIRCLE";
                addValueToMatrix(e.target.id, CROSS);
                if(checkHorizontalFields(e.target.parentNode.id) || checkVerticalFields() || checkSideFields()){
                    alert(`${last} WINS!!`)
                }

            } else {
                element.innerHTML = "<img src='assets/circle.svg' alt='' width='90px' />"
                last = CIRCLE
                nextNode.innerText ="Next turn is: CROSS";
                addValueToMatrix(e.target.id, CIRCLE);
                if(checkHorizontalFields(e.target.parentNode.id) || checkVerticalFields() || checkSideFields()){
                    alert(`${last} WINS!!`)
                }
            }
        })
    });
})

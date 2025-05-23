
function matrixCalc(){
return(
    <>
    <header>
         <h2 style="display: flex;margin: 30px 20px 50px 100px; background-color: beige;">Matrix Calculator</h2><hr/>
 
    </header>
      <div class="row">
        <div class="col-4 my-2 " >
            <h3>Matrix Operation</h3>
            <ul>
                <li>Matrix Multiplication</li>
                <li>Matrix Addition</li>
                <li>Matrix Inverse</li>
            </ul>
        </div>
<div class="matrix-container col-4" style="margin-top: 20px;">
    <h3>Matrix A:</h3>
    <table id="matrixTableA"></table>
    <div class="my-2">
    <button class="btn x-2 y-2 btn-primary" onclick="addRow('A')">Add Row</button>
    <button class="btn x-2 y-2 btn-danger" onclick="removeRow('A')">Remove Row</button>
    <button class="btn x-2 y-2 btn-primary" onclick="addColumn('A')">Add Column</button>
    <button class="btn x-2 y-2 btn-danger" onclick="removeColumn('A')">Remove Column</button>
    <button class="btn x-2 y-2 btn-success" onclick="readMatrix('A')">Show Matrix A</button>
    <p id="matrixA"></p>
    </div>
</div>

<div class="matrix-container col-4">
    <h3>Matrix B:</h3>
    <table id="matrixTableB"></table>
    <div class="my-2">
    <button class="btn x-2 y-2 btn-primary" onclick="addRow('B')">Add Row</button>
    <button  class="btn x-2 y-2 btn-danger" onclick="removeRow('B')">Remove Row</button>
    <button  class="btn x-2 y-2 btn-primary " onclick="addColumn('B')">Add Column</button>
    <button  class="btn x-2 y-2 btn-danger " onclick="removeColumn('B')">Remove Column</button>
    <button  class="btn x-2 y-2 btn-success" onclick="readMatrix('B')">Show Matrix B</button>
    <p id="matrixB"></p>
    </div>
</div>

    </div>
<div class="row result-matrix" style="clear: both; margin-top: 30px;">
    <div class="col-4"></div>
    <div class="col-4">
            <button onclick="multiplyMatrices()">Multiply A × B</button>
    <h3>Result (Matrix C = A × B):</h3>
    <table id="resultMatrixC"></table>
    </div>

</div>
    </>

)



  
}
export default matrixCalc;

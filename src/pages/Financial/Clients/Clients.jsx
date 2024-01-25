import React from 'react'
import "./Clients.css"
const Clients = () => {
  return (
    <div>
  
<div role="region" aria-labelledby="Cap" tabindex="0" className="tableContainer">
  <table className='table table1'>
    <thead>
      <tr className='tr'>
        <th className='th'>Author</th>
        <th className='th'>Title</th>
        <th className='th'>Year</th>
        <th className='th'>ISBN-13</th>
        <th className='th'>ISBN-10</th>
      </tr>
    </thead>
    <tbody>
      <tr className='tr'>
        <td className='td'>Miguel De Cervantes</td>
        <td className='td'>The Ingenious Gentleman Don Quixote of La Mancha</td>
        <td className='td'>1605</td>
        <td className='td' role="cell" >9783125798502</td>
        <td className='td'>3125798507</td>
      </tr>
      <tr className='tr'>
        <td  className='td'>Mary Shelley</td>
        <td  className='td'>Frankenstein; or, The Modern Prometheus</td>
        <td  className='td'>1818</td>
        <td  className='td'>9781530278442</td>
        <td  className='td'>1530278449</td>
      </tr>
      <tr className='tr'>
        <td  className='td'>Herman Melville</td>
        <td  className='td'>Moby-Dick; or, The Whale</td>
        <td  className='td'>1851</td>
        <td  className='td'>9781530697908</td>
        <td  className='td'>1530697905</td>
      </tr>
      <tr className='tr'>
        <td  className='td'>Emma Dorothy Eliza Nevitte Southworth</td>
        <td  className='td'>The Hidden Hand</td>
        <td  className='td'>1888</td>
        <td  className='td'>9780813512969</td>
        <td  className='td'>0813512964</td>
      </tr >
      <tr className='tr'>
        <td  className='td'>F. Scott Fitzgerald</td>
        <td  className='td'>The Great Gatsby</td>
        <td className='td'>1925</td>
        <td  className='td'>9780743273565</td>
        <td  className='td'>0743273567</td>
      </tr>
      <tr className='tr'>
        <td  className='td'>George Orwell</td>
        <td  className='td'>Nineteen Eighty-Four</td>
        <td  className='td'>1948</td>
        <td  className='td'> 9780451524935</td>
        <td  className='td'>0451524934</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Complexity 1</h2>
<div role="region" aria-labelledby="Cap1" tabindex="0">
  <table>
    <caption id="Cap1">Contact Information</caption>
    <tr className='tr'>

      <th scope="col"  className='th'>Name</th>
      <th scope="col"  className='th'>Phone#</th>
      <th scope="col"  className='th'>Fax#</th>
      <th scope="col"  className='th'>City</th>
    </tr>
    <tr className='tr'>
      <td className='td'>1.</td>
      <th className='td' scope="row">Joel Garner</th>
      <td className='td'>412-212-5421</td>
      <td className='td'>412-212-5400</td>
      <td className='td'>Pittsburgh</td>
    </tr>
    <tr className='tr'>
      <td className='td'>2.</td>
      <th className='td' scope="row">Clive Lloyd</th>
      <td className='td'>410-306-1420</td>
      <td className='td'>410-306-5400</td>
      <td className='td'>Baltimore</td>
    </tr>
    <tr className='tr'>
      <td className='td'>3.</td>
      <th className='td' scope="row">Gordon Greenidge</th>
      <td className='td'>281-564-6720</td>
      <td className='td'>281-511-6600</td>
      <td className='td'>Houston</td>
    </tr>
  </table>
</div>

<h2>Complexity 2</h2>
<div role="region" aria-labelledby="Cap1" tabindex="0" className="tableContainer">
  <table className='table table2'>
    <caption id="Cap2">Grade Calculation</caption>
    <tr className='tr'>
      <th className='th' rowspan="2" id="h" >Homework</th>
      <th className='th' colspan="3" id="e" >Exams</th>
      <th className='th' colspan="3" id="p">Projects</th>
    </tr>
    <tr className='tr'>
      <th  className='th'  id="e1" headers="e">1</th>
      <th  className='th' id="e2" headers="e">2</th>
      <th className='th' id="ef" headers="e">Final</th>
      <th className='th' id="p1" headers="p">1</th>
      <th className='th' id="p2" headers="p">2</th>
      <th className='th' id="pf" headers="p">Final</th>
    </tr>
    <tr className='tr'>
      <td   className='td' headers="h">15%</td>
      <td className='td' headers="e e1">15%</td>
      <td className='td' headers="e e2">15%</td>
      <td className='td' headers="e ef">20%</td>
      <td  className='td' headers="p p1">10%</td>
      <td className='td' headers="p p2">10%</td>
      <td className='td' headers="p pf">15%</td>
    </tr>
  </table>
</div>
    </div>
  )
}

export default Clients
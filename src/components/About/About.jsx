import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./About.css"
export default function infoHome() {
  return (
    <div className='info'>
        <div className="infoItem">
            <span className="infoTitle">Receita</span>
            <div className="infoMoneyContainer">
                <span className="infoMoney">R$2,415</span>
                <span className="infoMoneyRate">-11.4 <ArrowDownwardIcon className='infoIcon nagative'></ArrowDownwardIcon></span>
                <span className="infoSub">Comparar com o mês anterior</span>
            </div>
        </div>
    
        <div className="infoItem">
            <span className="infoTitle">Vendas</span>
            <div className="infoMoneyContainer">
                <span className="infoMoney">R$5,415</span>
                <span className="infoMoneyRate">-1.4 <ArrowDownwardIcon  className='infoIcon nagative'></ArrowDownwardIcon></span>
                <span className="infoSub"><br/>Comparar com o mês anterior</span>
            </div>
        </div>

        <div className="infoItem">
            <span className="infoTitle">Despesas</span>
            <div className="infoMoneyContainer">
                <span className="infoMoney">R$2,225</span>
                <span className="infoMoneyRate">2.4 <ArrowUpwardIcon className='infoIcon'/></span>
                <span className="infoSub"><br/>Comparar com o mês anterior</span>
            </div>
        </div>
    </div>
  )
}

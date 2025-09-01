import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import sheets from "../axios/axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard(){
    const [eventos, setEventos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=>{
        async function getDados() {
            try{
                const responseEventos = await sheets.getEventos();
                const responseUsuarios = await sheets.getUsers();
                setEventos(responseEventos.data.events);
                setUsuarios(responseUsuarios.users);
            } catch(error){
                console.error(error)
            }
        }
        getDados();
    },[]);

    // Processar o dados para o gráfico de eventos por organizador
    const eventosPorOrganizador = {};
    eventos.forEach(evento =>{
        const orgId = evento.fk_id_organizador;
        eventosPorOrganizador[orgId] = (eventosPorOrganizador[orgId] || 0) + 1
    });

    const barData = {
        labels:Object.keys(eventosPorOrganizador),
        datasets:[
            {
                label:"Eventos por Organizador",
                data: Object.values(eventosPorOrganizador),
                backgroundColor: "rgba(75,192,192,0.6)"
            }
        ],
    }

    return(
        <div style={{padding:60}}>
            <h2>Dashboards</h2>
            <div style={{width: 600, marginBottom: 40}}> <Bar data={barData}/> </div>
            <div></div>
        </div>
    )
};





export default Dashboard;

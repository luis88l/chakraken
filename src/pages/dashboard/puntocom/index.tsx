/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import 'devextreme/dist/css/dx.light.css';
import KPage from '../../../components/page/KPagePerformance';
import MenuWeb from './Menu';
import { Form, GroupItem, Item } from 'devextreme-react/form';
import { Select } from '@chakra-ui/react';
import ApiService from "../../../../data/services/ApiService";
import { chain, orderBy } from "lodash";
import DateBox from 'devextreme-react/date-box';
import moment from 'moment'
import ButtonGroup from 'devextreme-react/button-group';
import { AcortarNewDate } from '../../../Utilerias/Fechas';
import Box, {
  Item as ItemBox,
} from 'devextreme-react/box';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Web(): any {
  const ID_DOMINIO_COPPEL = "3e22ec12-cdc3-11ea-863b-4b2d45d43637";
  const ID_DOMINIO_PACO_EL_CHATO = "1dad3da1-4417-49db-8ecb-a583dc4a584e";
  const ID_ROL_PACO_EL_CHATO = "ac20691d-4818-4d08-8b2b-123e67108093";
  const [DataDominios, setDataDominios] = useState<any>([]);
  const [DataPaginas, setDataPaginas] = useState<any>([]);
  const [DataSecciones, setDataSecciones] = useState<any>([]);
  const [DataScores, setDataScores] = useState<any>([]);
  const [Seccion, setSeccion] = useState<any>('');
  const [BloquearSecciones, setBloquearSecciones] = useState<boolean>(true);
  const [Pagina, setPagina] = useState<any>('');
  const [Dominio, setDominio] = useState<any>("");
  const [FechaInicio, setFechaInicio] = useState<any>(moment().subtract(7, 'day').toDate());
  const [FechaFinal, setFechaFinal] = useState<any>(moment().toDate());
  const [Dispositivo, setDispositivo] = useState<any>("Mobile");
  const [DispositivoFocus, setDispositivoFocus] = useState<any>(['left']);
  const [Red, setRed] = useState<any>("3G");
  const [RedFocus, setRedFocus] = useState<any>(['left']);
  const [Cache, setCache] = useState<any>("No");
  const [CacheFocus, setCacheFocus] = useState<any>(['right']);
  const OptionsChartLabel:any = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: ''
      },
      autocolors: false,
      tooltip: {
        mode: 'index',
        intersect: false,
        position: 'nearest',
        enabled: false,
        external: function (context) {
          // Tooltip Element
          let tooltipEl = document.getElementById('chartjs-tooltip')
          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement('div')
            tooltipEl.id = 'chartjs-tooltip'
            let table = '<table id="tableToolTip" style="box-shadow: 0px 2px 8px #999; '
            table += 'border-radius: 4px;background-color: #FFFFFF"></table>'
            tooltipEl.innerHTML = table
            document.body.appendChild(tooltipEl)
          }

          // Hide if no tooltip
          const tooltipModel: any = context.tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0'
            return
          }

          // Set caret Position
          tooltipEl.classList.remove('above', 'below', 'no-transform')
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
          } else {
            tooltipEl.classList.add('no-transform')
          }

          function getBody(bodyItem: any) {
            return bodyItem.lines
          }

          // Set Text
          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || []
            const bodyLines = tooltipModel.body.map(getBody)

            let innerHtml = '<thead>'

            titleLines.forEach(function (title: any) {
              innerHtml += '<tr><th style="padding: 0px 16px 8px">' + title + '</th></tr>'
            })
            innerHtml += '</thead><tbody>'
            const items = this._chart
            bodyLines.forEach(function (body: any, i: any) {
              const bgColor = tooltipModel.labelColors[i].borderColor
              const text = items.data.datasets[i].text || ''
              let span = '<div style="width: 8px;height: 8px;border-radius: 2px;margin-right: 12px;'
              span += `background-color: ${bgColor}; display: inline-flex"></div>`
              // let kb = text
              innerHtml += `<tr><td style="padding: 0px 16px 8px">${span}${body} ${text}</td></tr>`
            })
            innerHtml += '</tbody>'
            const tableRoot = tooltipEl.querySelector('#tableToolTip')
            // @ts-ignore
            tableRoot.innerHTML = innerHtml
          }
          const position = this._chart.canvas.getBoundingClientRect()
          const tablaHeight = tooltipEl.querySelector('#tableToolTip').offsetHeight
          tooltipEl.style.opacity = '1'
          tooltipEl.style.position = 'absolute'
          tooltipEl.style.zIndex = '1'
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
          tooltipEl.style.top = position.top + tooltipModel.caretY - (tablaHeight / 2) + 'px'
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
          tooltipEl.style.pointerEvents = 'none'
        },
        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        titleColor: '#636363',
        bodyColor: '#636363',
        bevelWidth: 1,
        bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
        bevelShadowColor: '#929292',
      },
    },
    animation: {
      duration: 0 // general animation time
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
  };
  const [DataChart, setDataChart] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Performance',
        data: DataScores,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });
  const minDate = new Date(1900, 0, 1);
  const now = new Date();

  const DispositivosArreglo = [
    {
      text: 'Mobile',
      alignment: 'left',
      hint: 'Align left',
    },
    {
      text: 'Desktop',
      alignment: 'right',
      hint: 'Align right',
    },
  ]
  const RedArreglo = [
    {
      text: '3G',
      alignment: 'left',
      hint: 'Align left',
    },
    {
      text: '4G',
      alignment: 'right',
      hint: 'Align right',
    },
  ]
  const CacheArreglo = [
    {
      text: 'Si',
      alignment: 'left',
      hint: 'Align left',
    },
    {
      text: 'No',
      alignment: 'right',
      hint: 'Align right',
    },
  ]



  useEffect(() => {
    void CargarDominios();
  }, []);


  useEffect(() => {
    if (Pagina) {
      void CargarScore()
    }
  }, [Dominio, Cache, Red, Dispositivo, Pagina, FechaFinal, FechaInicio]);



  const CargarScore = async () => {
    const Tipo = Cache === 'Si' && Red === '3G' ? 1 : Cache === 'No' && Red === '3G' ? 0 : Cache === 'si' && Red === '4G' ? 3 : 2;
    const form = new FormData();
    form.append("id_dominio", Dominio);
    form.append('fh_Inicio', AcortarNewDate(FechaInicio))
    form.append('fh_Fin', AcortarNewDate(FechaFinal))
    form.append('id_pagina', Pagina)
    form.append('id_tipoAuditoria', String(Tipo))
    form.append('id_tipoDato', 'Kb')
    form.append('isMobile', Dispositivo === 'Mobile' ? '1' : '0')
 /*    console.log("🚀 ~ file: index.tsx:99 ~ CargarScore ~ form", Tipo, Dispositivo, Red, Cache, Dispositivo === 'Mobile' ? '1' : '0')
    console.log("🚀 ~ file: index.tsx:99 ~ CargarScore ~ form", Dominio, AcortarNewDate(FechaInicio), AcortarNewDate(FechaFinal), Pagina) */

    await ApiService.GetBudgetData(form).then((res: any) => {
      if (res.data.status === 200) {
        setDataScores(res.data.data[0].Detalles)
        setDataChart({
          labels: [...new Set(res.data.data[0].Detalles.map((x: any) => x.fh_registro))],
          datasets: [
            {
              label: 'Performance',
              data: [...(res.data.data[0].Detalles.map((x: any) => x.pj_performance))],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ],
        })
       // console.log(res.data.data[0].Detalles)
      } else {
        console.log("Ocurrio algo");
      }
    });
  };

  const CargarPaginas = async (dominio: any) => {
    const form = new FormData();
    form.append("id_dominio", dominio || Dominio);

    await ApiService.GetConfLightWallet(form).then((res: any) => {
      if (res.data.status === 200) {
        const seccionesAux = chain(res.data.data)
          .groupBy('nb_pagina')
          .map((value: any, key) => (
            {
              pagina: key,
              secciones: value[0].nb_seccion ? orderBy(value, 'nb_seccion', 'asc') : [],
              idPagina: value[0].id_pagina
            }
          )
          )
          .orderBy('pagina', 'asc')
          .value()
        setDataPaginas(seccionesAux)
        if (seccionesAux.length > 0) {
          setPagina(seccionesAux[0].idPagina)
        }
        setDataPaginas(seccionesAux)
      } else {
        console.log("Ocurrio algo");
      }
    });
  };

  const CargarDominios = async () => {
    const usuarioLocal = localStorage.getItem("_user");

    let dominioSlc = {
      idDominio: ID_DOMINIO_COPPEL,
      dominio: "Coppel",
    };
    let usuario = {
      nb_usuario: "",
      id_rol: "",
    };

    if (usuarioLocal != null) {
      usuario = JSON.parse(usuarioLocal);
      if (usuario.id_rol === ID_ROL_PACO_EL_CHATO) {
        dominioSlc = {
          idDominio: ID_DOMINIO_PACO_EL_CHATO,
          dominio: "Paco el Chato",
        };
      }
    }
    const dominiosIds =
      usuario.id_rol === ID_ROL_PACO_EL_CHATO ? [ID_DOMINIO_PACO_EL_CHATO] : [];

    await ApiService.getDominios(dominiosIds).then((res: any) => {
      if (res.data.status === 200) {
        setDataDominios(orderBy(res.data.data, "nb_dominio", "asc"));
        setDominio(ID_DOMINIO_COPPEL);
      } else {
        setDataDominios([dominioSlc]);
        setDominio(ID_DOMINIO_COPPEL);
      }
      void CargarPaginas(ID_DOMINIO_COPPEL);
    });
  };

  const getSizeQualifier = (width: any) => {
    if (width < 768) return "xs";
    if (width < 992) return "sm";
    if (width < 1200) return "md";
    return "lg";
  };

  const ComboDominio = async (e: any) => {
    const { value } = e.target;
    setDataPaginas([]);
    setDataSecciones([])
    await CargarPaginas(value)
    setDominio(value);
  };

  const ColocarSecciones = (PaginaId: any) => {
    const InformacionPagina = DataPaginas.find((sa: any) => sa.idPagina === PaginaId)
    if (InformacionPagina.secciones.length > 0) {
      setDataSecciones(InformacionPagina.secciones)
      setSeccion(InformacionPagina.secciones[0].idPagina)
      setBloquearSecciones(false)
    } else {
      setBloquearSecciones(true)
    }
  }

  const ComboPagina = async (e: any) => {
    const { value } = e.target;
    setDataSecciones([])
    ColocarSecciones(value)
    setPagina(value);
  };

  const ComboSecciones = async (e: any) => {
    const { value } = e.target;
    setSeccion(value);
  };

  const HanleChangeFechaInicio = async (e: any) => {
    setFechaInicio(e)
  }

  const HanleChangeFechaFin = async (e: any) => {
    setFechaFinal(e)
  }

  const DispositivoClick = async (e: any) => {
    const { alignment, text } = e.itemData;
    setDispositivoFocus([alignment])
    setDispositivo(text)
  }
  const RedClick = async (e: any) => {
    const { alignment, text } = e.itemData;
    setRedFocus([alignment])
    setRed(text)
  }
  const CacheClick = async (e: any) => {
    const { alignment, text } = e.itemData;
    setCacheFocus([alignment])
    setCache(text)
  }

  return (
    <KPage
      title={"Reporte Score"}
      Menu={<MenuWeb />}
    >
      <Form>
        <GroupItem colCountByScreen={getSizeQualifier} colCount={8}>
          <Item colSpan={2} dataField="Dominios" >
            <Select
              placeholder=""
              value={Dominio}
              onChange={(e: any) => ComboDominio(e)}
            >
              {DataDominios.map((Dominio: any, Index: number) => (
                <option key={"1" + String(Index)} value={Dominio.idDominio}>
                  {Dominio.dominio}
                </option>
              ))}
            </Select>
          </Item>
          <Item colSpan={2} dataField="Paginas" >
            <Select
              placeholder=""
              value={Pagina}
              onChange={(e: any) => ComboPagina(e)}
            >
              {DataPaginas.map((Pag: any, Index: number) => (
                <option key={"Pagina" + String(Index)} value={Pag.idPagina}>
                  {Pag.pagina}
                </option>
              ))}
            </Select>
          </Item>
          <Item colSpan={2} dataField="Seccciones">
            <Select
              placeholder=""
              value={Seccion}
              onChange={(e: any) => ComboSecciones(e)}
              disabled={BloquearSecciones}
            >
              {DataSecciones.map((Sec: any, Index: number) => (
                <option key={"Sec" + String(Index)} value={Sec.id_pagina}>
                  {Sec.nb_seccion}
                </option>
              ))}
            </Select>
          </Item>
          <Item colSpan={2} dataField="Fecha Inicio" >
            <DateBox value={FechaInicio} onValueChange={(e: any) => HanleChangeFechaInicio(e)} displayFormat='dd/MM/yyyy'
              type="date" name='FechaInicio' min={minDate} max={FechaFinal} acceptCustomValue={false} />
          </Item>
          <Item colSpan={2} dataField="Dispositivo" >
            <ButtonGroup
              keyExpr="alignment"
              selectedItemKeys={DispositivoFocus}
              id='Dispositivos'
              items={DispositivosArreglo}
              stylingMode="outlined"
              onItemClick={(e: any) => DispositivoClick(e)}
              activeStateEnabled
            />
          </Item>
          <Item colSpan={2} dataField="Red" >
            <ButtonGroup
              keyExpr="alignment"
              selectedItemKeys={RedFocus}
              id='Red'
              items={RedArreglo}
              stylingMode="outlined"
              onItemClick={(e: any) => RedClick(e)}
              activeStateEnabled
            />
          </Item>
          <Item colSpan={2} dataField="Cache" >
            <ButtonGroup
              keyExpr="alignment"
              selectedItemKeys={CacheFocus}
              id='Cache'
              items={CacheArreglo}
              stylingMode="outlined"
              onItemClick={(e: any) => CacheClick(e)}
              activeStateEnabled
            />
          </Item>
          <Item colSpan={2} dataField="Fecha Fin" >
            <DateBox value={FechaFinal} onValueChange={(e: any) => HanleChangeFechaFin(e)} displayFormat='dd/MM/yyyy'
              acceptCustomValue={false} type="date" name='FechaFinal' min={FechaInicio} max={now} />
          </Item>
        </GroupItem>
        <GroupItem>
          <Box
            direction="row"
            width="100%">
            <ItemBox ratio={2}>
              <Line options={OptionsChartLabel} data={DataChart} />
            </ItemBox>
            <ItemBox ratio={1}>

            </ItemBox>
          </Box>
        </GroupItem>

      </Form >

    </KPage >
  );
}

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

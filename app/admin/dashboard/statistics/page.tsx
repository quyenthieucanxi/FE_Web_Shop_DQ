  "use client";
  import React, { useEffect, useState } from 'react';
  import Dropdown from 'react-dropdown';
  import 'react-dropdown/style.css';
  import { Bar } from 'react-chartjs-2';
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
  import useAxiosAuth from '@/libs/hooks/useAxiosAuth';
  import { useSession } from 'next-auth/react';

  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );



  export default function StatisticsPage() {
    const {data: session} = useSession();
    const axiosAuth = useAxiosAuth()
    const optionsView = [
      { value: 'month', label: 'Trong tháng' },
      { value: 'week', label: 'Trong tuần' },
    ];
    const [status, setStatus] = useState('week')
    const [defaultOption, setDefaultOpion] = useState(optionsView[0]);
    const handleChangeDrop = (selectedOption) => {
      setDefaultOpion(selectedOption)
      setStatus(selectedOption.value)
    }
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const [data, setData] = useState({
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Doanh thu',
          data: [0, 0, 0, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
    const getWeeklyData = async (date) => {
      const start = startOfWeek(date).toISOString();;
      const end = endOfWeek(date).toISOString();;
      const days = eachDayOfInterval({ start, end });
      const response = await axiosAuth.get(`api/Order/GetAllRevenueInWeek?start=${start}&end=${end}`);
      return {
        labels: response.data.data?.map(day => format(new Date(day.date), 'MMM d')),
        datasets: [
          {
            label: 'Doanh thu theo tuần',
            data: response.data.data?.map(item => item.revenue) || [0,0,0,0,0,0,0], // Dữ liệu mẫu, cập nhật với dữ liệu thực tế của bạn
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    
    };

    const getMonthlyData = async (date) => {
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const response = await axiosAuth.get(`api/Order/GetAllRevenueInMonth?month=${month}&year=${year}`);
        return {
          labels: [
            'Week 1', 'Week 2', 'Week 3', 'Week 4'
          ],
          datasets: [
            {
              label: `Doanh thu theo tháng ${month}`,
              data: response.data.data?.map(item => item?.revenue) || [0,0,0,0], // Dữ liệu mẫu, cập nhật với dữ liệu thực tế của bạn
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        };
      
    };
    useEffect(() => {
      if (session)
      {
        const fetchData = async () => {
          const fetchedData = status === 'week'
            ?  await getWeeklyData(selectedDate)
            : await getMonthlyData(selectedDate);
          setData(fetchedData);
        };
  
        fetchData();
      }
      
    }, [status, selectedDate,session?.user?.accessToken]);
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom" as const, // Sửa lỗi bằng cách sử dụng một trong các giá trị cụ thể mà Chart.js chấp nhận
        },
        title: {
          display: true,
          text: 'Thống kê Doanh thu ',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      barThickness: 20, // Điều chỉnh độ dày của các thanh
      maxBarThickness: 30,
    };
    
    return (
      <>
        <div className=" w-[85%]  ">
          <div className='my-4 bg-white'>
          <h1 className=' text-yellow-300 ml-5'>Chế độ xem</h1>
          <Dropdown className="relative py-[6px] pr-3 pl-2 text-sm font-medium cursor-pointer bg-white" menuClassName=""
            options={optionsView} onChange={handleChangeDrop} value={defaultOption} placeholder="Select an option" />
          </div>
          

          <div className='bg-white'>
            <label >
              Chọn ngày:
              <DatePicker className=' ml-12' selected={selectedDate} onChange={handleDateChange} />
            </label>
          </div>
          <Bar options={options} data={data} />;
        </div>

      </>
    )
  }
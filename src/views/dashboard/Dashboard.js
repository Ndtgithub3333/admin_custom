import React, { useState } from 'react'
import classNames from 'classnames'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('Month')

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
  }

  const progressExample = [
    { 
      title: 'Total Users', 
      value: '29,703', 
      percent: 100, 
      color: 'primary',
      description: 'Total registered users'
    },
    { 
      title: 'Premium Users', 
      value: '8,912', 
      percent: 30, 
      color: 'warning',
      description: 'Percentage of total users'
    },
    { 
      title: 'Active Users', 
      value: '24,093', 
      percent: 81, 
      color: 'success',
      description: 'Active in last 30 days'
    },
    { 
      title: 'New Users', 
      value: '2,123', 
      percent: 7, 
      color: 'info',
      description: 'Joined this month'
    }
  ]

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Users',
        backgroundColor: 'rgba(0,0,255,0.1)',
        borderColor: 'rgba(0,0,255,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [29703, 28234, 27384, 25473, 23976, 22345, 20234],
        type: 'line'
      },
      {
        label: 'Premium Users',
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderColor: 'rgba(255,193,7,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [8912, 8234, 7645, 7123, 6845, 6234, 5845],
        type: 'line'
      },
      {
        label: 'New Users',
        backgroundColor: 'rgba(0,216,255,0.8)',
        borderColor: 'rgba(0,216,255,0.8)',
        data: [2123, 1897, 2045, 1678, 1890, 1654, 1789],
        type: 'bar'
      },
      {
        label: 'Active Users',
        backgroundColor: 'rgba(40,167,69,0.8)',
        borderColor: 'rgba(40,167,69,0.8)',
        data: [24093, 23187, 22654, 21897, 22345, 21234, 20987],
        type: 'bar'
      }
    ]
  }

  // Progress data for each section
  const revenueProgress = [
    { 
      title: 'Total Revenue', 
      value: '$245,890', 
      percent: 100, 
      color: 'primary',
      description: 'Total earnings'
    },
    { 
      title: 'New Sales', 
      value: '$32,450', 
      percent: 13, 
      color: 'success',
      description: 'Last 30 days'
    },
    { 
      title: 'Growth Rate', 
      value: '+12.5%', 
      percent: 12.5, 
      color: 'info',
      description: 'Monthly increase'
    },
    { 
      title: 'Average Order', 
      value: '$99.99', 
      percent: 85, 
      color: 'warning',
      description: 'Per transaction'
    }
  ]

  const examProgress = [
    { 
      title: 'Total Attempts', 
      value: '15,234', 
      percent: 100, 
      color: 'primary',
      description: 'All exam attempts'
    },
    { 
      title: 'Average Score', 
      value: '685', 
      percent: 69, 
      color: 'warning',
      description: 'Out of 990'
    },
    { 
      title: 'Pass Rate', 
      value: '78%', 
      percent: 78, 
      color: 'success',
      description: 'Score > 650'
    },
    { 
      title: 'New Attempts', 
      value: '1,890', 
      percent: 12, 
      color: 'info',
      description: 'This month'
    }
  ]

  const blogProgress = [
    { 
      title: 'Total Views', 
      value: '89,234', 
      percent: 100, 
      color: 'primary',
      description: 'All-time views'
    },
    { 
      title: 'Active Posts', 
      value: '156', 
      percent: 85, 
      color: 'warning',
      description: 'Published posts'
    },
    { 
      title: 'Engagement', 
      value: '65%', 
      percent: 65, 
      color: 'success',
      description: 'Interaction rate'
    },
    { 
      title: 'New Posts', 
      value: '23', 
      percent: 15, 
      color: 'info',
      description: 'Added this month'
    }
  ]

  // Chart data for each section
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Revenue',
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: 'rgba(0,123,255,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [245890, 238450, 229780, 218340, 208900, 198450, 188900],
        type: 'line'
      },
      {
        label: 'New Sales',
        backgroundColor: 'rgba(40,167,69,0.8)',
        borderColor: 'rgba(40,167,69,0.8)',
        data: [32450, 30890, 29780, 28340, 27890, 26450, 25890],
        type: 'bar'
      },
      {
        label: 'Average Order',
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderColor: 'rgba(255,193,7,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [99.99, 98.50, 97.80, 99.20, 98.90, 99.50, 99.99],
        type: 'line'
      }
    ]
  }

  const examChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Attempts',
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: 'rgba(0,123,255,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [15234, 14890, 14234, 13890, 13234, 12890, 12234],
        type: 'line'
      },
      {
        label: 'Average Score',
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderColor: 'rgba(255,193,7,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [685, 688, 682, 675, 670, 665, 660],
        type: 'line'
      },
      {
        label: 'New Attempts',
        backgroundColor: 'rgba(40,167,69,0.8)',
        borderColor: 'rgba(40,167,69,0.8)',
        data: [1890, 1780, 1670, 1560, 1450, 1340, 1230],
        type: 'bar'
      }
    ]
  }

  const blogChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Views',
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: 'rgba(0,123,255,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [89234, 85678, 82123, 78567, 75012, 71456, 67901],
        type: 'line'
      },
      {
        label: 'Engagement Rate',
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderColor: 'rgba(255,193,7,0.5)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [65, 63, 64, 62, 61, 60, 59],
        type: 'line'
      },
      {
        label: 'New Posts',
        backgroundColor: 'rgba(40,167,69,0.8)',
        borderColor: 'rgba(40,167,69,0.8)',
        data: [23, 21, 19, 17, 15, 13, 11],
        type: 'bar'
      }
    ]
  }

  // Render statistics sections
  const renderStatisticsSection = (title, chartData, progressData) => (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h4 className="card-title mb-0">
              {title}
            </h4>
            <div className="small text-body-secondary">
              {timeRange === 'Day' && 'Last 24 hours'}
              {timeRange === 'Month' && 'Last 30 days'}
              {timeRange === 'Year' && 'Last 12 months'}
            </div>
          </CCol>
          <CCol sm={7} className="d-none d-md-block">
            <CButton color="primary" className="float-end">
              <CIcon icon={cilCloudDownload} />
            </CButton>
            <CButtonGroup className="float-end me-3">
              {['Day', 'Month', 'Year'].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  className="mx-0"
                  active={value === timeRange}
                  onClick={() => handleTimeRangeChange(value)}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup>
          </CCol>
        </CRow>
        <MainChart data={chartData} timeRange={timeRange} />
      </CCardBody>
      <CCardFooter>
        <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 4 }} className="mb-2 text-center">
          {progressData.map((item, index) => (
            <CCol key={index}>
              <div className="text-body-secondary">{item.title}</div>
              <div className="fw-semibold text-truncate">
                {item.value} ({item.percent}%)
              </div>
              <div className="small text-body-secondary">{item.description}</div>
              <CProgress thin className="mt-2" color={item.color} value={item.percent} />
            </CCol>
          ))}
        </CRow>
      </CCardFooter>
    </CCard>
  )

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      
      {/* User Statistics (existing) */}
      {renderStatisticsSection('User Statistics', chartData, progressExample)}
      
      {/* Revenue Statistics */}
      {renderStatisticsSection('Revenue Statistics', revenueChartData, revenueProgress)}
      
      {/* Exam Statistics */}
      {renderStatisticsSection('Exam Statistics', examChartData, examProgress)}
      
      {/* Blog Statistics */}
      {renderStatisticsSection('Blog Statistics', blogChartData, blogProgress)}
    </>
  )
}

export default Dashboard

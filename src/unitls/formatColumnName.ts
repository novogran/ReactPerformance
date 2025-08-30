export const formatColumnName = (column: string) => {
  const nameMap: { [key: string]: string } = {
    year: 'Year',
    iso_code: 'ISO Code',
    co2: 'CO2 Emissions',
    co2_per_capita: 'CO2 Per Capita',
    methane: 'Methane Emissions',
    oil_co2: 'Oil CO2',
    gas_co2: 'Gas CO2',
    cement_co2: 'Cement CO2',
    flaring_co2: 'Flaring CO2',
    other_co2: 'Other CO2',
    temperature_change_from_co2: 'Temperature Change',
    energy_per_capita: 'Energy Per Capita',
    energy_per_gdp: 'Energy Per GDP',
  };

  return nameMap[column] || column.replace(/_/g, ' ');
};

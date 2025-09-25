const REGIONS = ["Europe", "Asia", "Oceania", "Americas", "Africa"];

export default function RegionSelect({ 
    id = "region", 
    value, 
    onChange, 
    disabled = false, name 
}) {

  return (
    <select
      id={id}
      name={name || id}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {REGIONS.map((regionName) => (
        <option key={regionName} value={regionName}>{regionName}</option>
      ))}
    </select>
  );
}
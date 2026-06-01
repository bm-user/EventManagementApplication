function ProgressBar({ currentStep }) {
    const steps = [
      { number: 1, label: 'Select Tickets' },
      { number: 2, label: 'Attendee Details' },
      { number: 3, label: 'Confirmation' },
    ]
  
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                currentStep > step.number
                  ? 'bg-purple-600 text-white'
                  : currentStep === step.number
                  ? 'bg-purple-600 text-white ring-4 ring-purple-200'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <span className={`text-xs mt-1 font-medium ${
                currentStep >= step.number ? 'text-purple-600' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-20 h-1 mx-2 mb-4 rounded transition-colors ${
                currentStep > step.number ? 'bg-purple-600' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    )
  }
  
  export default ProgressBar
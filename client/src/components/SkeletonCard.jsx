function SkeletonCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 animate-pulse">

      <div className="h-6 bg-slate-700 rounded mb-4"></div>

      <div className="h-4 bg-slate-700 rounded mb-2"></div>

      <div className="h-4 bg-slate-700 rounded mb-2"></div>

      <div className="h-4 bg-slate-700 rounded"></div>

    </div>
  );
}

export default SkeletonCard;
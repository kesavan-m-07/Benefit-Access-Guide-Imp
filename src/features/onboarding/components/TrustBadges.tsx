import Icon from "@shared/components/Icons/Icon";

type Props = {
  mobile?: boolean;
};

const TrustBadges = ({ mobile = false }: Props) => {
  if (mobile) {
    return (
      <>
        <div className="flex items-center gap-3 bg-white/70 px-4 py-2.5 rounded-xl border border-slate-200/50 shadow-sm flex-1 max-w-47.5">
          <Icon name="lock" size={24} />
          <div className="flex flex-col text-left">
            <p className="text-[11px] font-semibold text-slate-800">
              Secure & Private
            </p>
            <p className="text-[9px] text-slate-500">256-bit encryption</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/70 px-4 py-2.5 rounded-xl border border-slate-200/50 shadow-sm flex-1 max-w-47.5">
          <Icon name="hand" size={24} />
          <div className="flex flex-col text-left">
            <p className="text-[11px] font-semibold text-slate-800">
              Free Access
            </p>
            <p className="text-[9px] text-slate-500">No hidden fees</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 bg-white/80 px-5 py-3 rounded-2xl border border-slate-200/50 shadow-md backdrop-blur-md">
        <Icon name="lock" size={24} />
        <div className="flex flex-col text-left">
          <p className="text-xs font-semibold text-slate-800">
            Secure & Private
          </p>
          <p className="text-[10px] text-slate-500">256-bit encryption</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white/80 px-5 py-3 rounded-2xl border border-slate-200/50 shadow-md backdrop-blur-md">
        <Icon name="hand" size={24} />
        <div className="flex flex-col text-left">
          <p className="text-xs font-semibold text-slate-800">Free Access</p>
          <p className="text-[10px] text-slate-500">No hidden fees</p>
        </div>
      </div>
    </>
  );
};

export default TrustBadges;

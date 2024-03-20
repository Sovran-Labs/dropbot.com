import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface P {
  title: string;
  timeFrame: string;
  stats: {
    id: number;
    name: string;
    stat: string;
    change: string;
    changeType: string;
  }[];
}

export function StatsGroup3(P: P) {
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-white">
        {P.title} <small>{P.timeFrame}</small>
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {P.stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-gray-900 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-white">
                {item.name}
              </p>
            </dt>
            <dd className="flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-white">{item.stat}</p>

              {item.changeType === "increase" && (
                <p
                  className={classNames(
                    "text-green-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  <ArrowUpIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                </p>
              )}

              {item.changeType === "decrease" && (
                <p
                  className={classNames(
                    "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  <ArrowDownIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                  {item.change}
                </p>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gray-900 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-gray-300 hover:text-indigo-500"
                  >
                    View detail
                    <span className="sr-only"> {item.name} detail</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

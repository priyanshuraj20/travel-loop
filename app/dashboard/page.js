"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var link_1 = require("next/link");
function DashboardPage() {
    var _a;
    var session = (0, react_2.useSession)().data;
    var _b = (0, react_1.useState)(null), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), mobileMenuOpen = _d[0], setMobileMenuOpen = _d[1];
    (0, react_1.useEffect)(function () {
        function fetchDashboard() {
            return __awaiter(this, void 0, void 0, function () {
                var res, json, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, 5, 6]);
                            return [4 /*yield*/, fetch("/api/dashboard")];
                        case 1:
                            res = _a.sent();
                            if (!res.ok) return [3 /*break*/, 3];
                            return [4 /*yield*/, res.json()];
                        case 2:
                            json = _a.sent();
                            setData(json);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 6];
                        case 4:
                            error_1 = _a.sent();
                            console.error("Failed to fetch dashboard", error_1);
                            return [3 /*break*/, 6];
                        case 5:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        fetchDashboard();
    }, []);
    if (loading) {
        return (<div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Consulting your records...
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-page via-page/95 to-secondary/10">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (<div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={function () { return setMobileMenuOpen(false); }}/>)}

      {/* Sidebar Navigation */}
      <div className={"fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ".concat(mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        <div className="p-6 border-b border-border/30">
          <h2 className="text-xl font-serif italic text-primary">
            Travel Loop
          </h2>
          <p className="text-xs text-muted uppercase tracking-widest mt-1">
            Control Center
          </p>
        </div>
        <nav className="p-4 space-y-2">
          <link_1.default href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20" onClick={function () { return setMobileMenuOpen(false); }}>
            <span className="text-lg">📊</span>
            <span className="font-medium">Dashboard</span>
          </link_1.default>
          <link_1.default href="/trips" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors" onClick={function () { return setMobileMenuOpen(false); }}>
            <span className="text-lg">🗂️</span>
            <span className="font-medium">My Trips</span>
          </link_1.default>
          <link_1.default href="/trips/create" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors" onClick={function () { return setMobileMenuOpen(false); }}>
            <span className="text-lg">✈️</span>
            <span className="font-medium">Plan Trip</span>
          </link_1.default>
          <link_1.default href="/search/cities" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors" onClick={function () { return setMobileMenuOpen(false); }}>
            <span className="text-lg">🏙️</span>
            <span className="font-medium">Discover Cities</span>
          </link_1.default>
          <link_1.default href="/search/activities" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors" onClick={function () { return setMobileMenuOpen(false); }}>
            <span className="text-lg">🎯</span>
            <span className="font-medium">Find Activities</span>
          </link_1.default>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border/30 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button onClick={function () { return setMobileMenuOpen(!mobileMenuOpen); }} className="lg:hidden p-2 rounded-lg hover:bg-secondary/20 transition-colors" aria-label="Toggle menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif italic text-primary mb-1">
                    Traveler's Command Center
                  </h1>
                  <p className="text-muted font-serif italic">
                    Welcome back, {((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.name) || "Explorer"}. Your adventures await.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <link_1.default href="/trips/create">
                  <button className="primary px-4 py-2 text-sm uppercase tracking-widest font-bold md:px-6">
                    Plan New Journey
                  </button>
                </link_1.default>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Quick Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="stat-card group p-3">
              <div className="text-xl mb-1">🗺️</div>
              <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.totalTrips) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Journeys
              </div>
            </div>
            <div className="stat-card group p-3">
              <div className="text-xl mb-1">🌍</div>
              <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.totalCountries) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Countries
              </div>
            </div>
            <div className="stat-card group p-3">
              <div className="text-xl mb-1">💰</div>
              <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                ${((data === null || data === void 0 ? void 0 : data.stats.totalBudget) || 0).toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Invested
              </div>
            </div>
            <div className="stat-card group p-3">
              <div className="text-xl mb-1">🎯</div>
              <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.totalActivities) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Activities
              </div>
            </div>
            <div className="stat-card group p-3">
              <div className="text-xl mb-1">🏙️</div>
              <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.totalCitiesVisited) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Cities
              </div>
            </div>
            <div className="stat-card group p-3">
              <div className="text-xl mb-1">📅</div>
              <div className="text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.monthlyTrips) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                This Year
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                ${((data === null || data === void 0 ? void 0 : data.stats.totalBudget) || 0).toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Invested
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.totalActivities) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Activities
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">🏙️</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.totalCitiesVisited) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Cities
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {(data === null || data === void 0 ? void 0 : data.stats.monthlyTrips) || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                This Year
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Upcoming & Recent */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Trips */}
              <section className="dashboard-section">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif italic text-primary">
                    Upcoming Adventures
                  </h2>
                  <link_1.default href="/trips/create">
                    <button className="ink-link text-sm uppercase tracking-widest font-bold">
                      + New Trip
                    </button>
                  </link_1.default>
                </div>

                {(data === null || data === void 0 ? void 0 : data.upcomingTrips.length) ? (<div className="grid gap-4">
                    {data.upcomingTrips.map(function (trip) { return (<div key={trip.id} className="trip-card group">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-serif italic group-hover:text-primary transition-colors mb-2">
                              {trip.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted">
                              <span className="flex items-center gap-1">
                                📅{" "}
                                {new Date(trip.startDate).toLocaleDateString()}
                              </span>
                              <span className="text-border">•</span>
                              <span>
                                {Math.ceil((new Date(trip.endDate).getTime() -
                    new Date(trip.startDate).getTime()) /
                    (1000 * 60 * 60 * 24))}{" "}
                                days
                              </span>
                            </div>
                          </div>
                          <link_1.default href={"/trips/".concat(trip.id)}>
                            <button className="primary text-xs px-4 py-2 uppercase tracking-widest font-bold">
                              View Details
                            </button>
                          </link_1.default>
                        </div>
                      </div>); })}
                  </div>) : (<div className="empty-state">
                    <div className="text-4xl mb-4">🗺️</div>
                    <h3 className="text-xl font-serif italic mb-2">
                      No upcoming journeys
                    </h3>
                    <p className="text-muted mb-6">
                      Time to plan your next adventure!
                    </p>
                    <link_1.default href="/trips/create">
                      <button className="secondary px-6 py-3 uppercase tracking-widest font-bold">
                        Start Planning
                      </button>
                    </link_1.default>
                  </div>)}
              </section>

              {/* Recent Activity Timeline */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {data === null || data === void 0 ? void 0 : data.recentActivities.slice(0, 8).map(function (activity, idx) { return (<div key={activity.id} className="activity-item group">
                      <div className="flex items-start gap-4">
                        <div className="activity-icon">
                          {activity.category === "food" && "🍽️"}
                          {activity.category === "sightseeing" && "🏛️"}
                          {activity.category === "adventure" && "🏔️"}
                          {activity.category === "culture" && "🎭"}
                          {activity.category === "shopping" && "🛍️"}
                          {![
                "food",
                "sightseeing",
                "adventure",
                "culture",
                "shopping",
            ].includes(activity.category) && "📍"}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            Added{" "}
                            <span className="font-serif italic">
                              "{activity.name}"
                            </span>{" "}
                            to {activity.stop.city.name}
                          </p>
                          <p className="text-sm text-muted">
                            {activity.stop.trip.name} •{" "}
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>); })}
                  {(!(data === null || data === void 0 ? void 0 : data.recentActivities) ||
            data.recentActivities.length === 0) && (<div className="text-center py-8 text-muted">
                      <p className="font-serif italic">
                        No recent activities yet
                      </p>
                    </div>)}
                </div>
              </section>
            </div>

            {/* Right Column - Budget & Recommendations */}
            <div className="space-y-6">
              {/* Budget Overview */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Budget Overview
                </h2>
                {(data === null || data === void 0 ? void 0 : data.budgetHighlights.length) ? (<div className="space-y-4">
                    {data.budgetHighlights.slice(0, 3).map(function (highlight, idx) { return (<div key={idx} className="budget-card">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-serif italic text-sm">
                            {highlight.tripName}
                          </h4>
                          <span className="text-xs text-muted">
                            {Math.round((highlight.totalAmount / highlight.totalLimit) *
                    100)}
                            %
                          </span>
                        </div>
                        <div className="budget-bar">
                          <div className="budget-fill" style={{
                    width: "".concat(Math.min(100, (highlight.totalAmount / highlight.totalLimit) * 100), "%"),
                    backgroundColor: highlight.totalAmount > highlight.totalLimit
                        ? "#ef4444"
                        : "#10b981",
                }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-2">
                          <span>${highlight.totalAmount.toLocaleString()}</span>
                          <span className="text-muted">
                            ${highlight.totalLimit.toLocaleString()}
                          </span>
                        </div>
                      </div>); })}
                  </div>) : (<div className="text-center py-6 text-muted">
                    <p className="font-serif italic text-sm">
                      No budget data yet
                    </p>
                  </div>)}
              </section>

              {/* Quick Actions */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch auto-rows-fr">
                  <link_1.default href="/trips/create" className="block h-full">
                    <button className="action-button h-full">
                      <span className="text-2xl mb-2">✈️</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        New Trip
                      </span>
                    </button>
                  </link_1.default>
                  <link_1.default href="/itinerary" className="block h-full">
                    <button className="action-button h-full">
                      <span className="text-2xl mb-2">🗺️</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Itinerary
                      </span>
                    </button>
                  </link_1.default>
                  <link_1.default href="/budget" className="block h-full">
                    <button className="action-button h-full">
                      <span className="text-2xl mb-2">💰</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Budget
                      </span>
                    </button>
                  </link_1.default>
                  <link_1.default href="/packing" className="block h-full">
                    <button className="action-button h-full">
                      <span className="text-2xl mb-2">🎒</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Packing
                      </span>
                    </button>
                  </link_1.default>
                </div>
              </section>

              {/* Recommended Destinations */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Explore New Places
                </h2>
                <div className="space-y-4">
                  {data === null || data === void 0 ? void 0 : data.recommendedDestinations.slice(0, 4).map(function (city) { return (<div key={city.id} className="destination-card group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif italic group-hover:text-primary transition-colors">
                            {city.name}
                          </h4>
                          <p className="text-xs text-muted">{city.country}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {__spreadArray([], Array(5), true).map(function (_, i) { return (<span key={i} className={"text-xs ".concat(i < Math.floor(city.costIndex / 20) ? "text-primary" : "text-border")}>
                              $
                            </span>); })}
                        </div>
                      </div>
                    </div>); })}
                </div>
              </section>

              {/* Top Destinations */}
              {(data === null || data === void 0 ? void 0 : data.topDestinations) && data.topDestinations.length > 0 && (<section className="dashboard-section">
                  <h2 className="text-2xl font-serif italic text-primary mb-6">
                    Your Favorite Spots
                  </h2>
                  <div className="space-y-3">
                    {data.topDestinations.map(function (dest, idx) { return (<div key={dest.cityId} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <span className="font-serif italic text-border text-sm">
                            #{idx + 1}
                          </span>
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {dest.city.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted">
                          {dest._count.cityId} visits
                        </span>
                      </div>); })}
                  </div>
                </section>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
